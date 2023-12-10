import React, { useState } from "react"
import FileIcons from "./FileIcons"
import { isFileType, type FileType, type FileItem } from "../../types/files"

interface FileExplorerProps {
  fileSystem: FileItem
  handleInsertNode: (folderId: FileItem["id"], payload: FileItem) => void
  handleDeleteNode?: (id: FileItem["id"]) => void
}

export const FileExplorer: React.FC<FileExplorerProps> = ({
  fileSystem,
  handleInsertNode,
  handleDeleteNode,
}: FileExplorerProps) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [selectedItem, setSelectedItem] = useState(false)
  const [error, setError] = useState("")
  const [addingNewItem, setAddingNewItem] = useState({
    isFolder: false,
    visible: false,
  })

  const handleNewItem = (
    e: React.MouseEvent<HTMLButtonElement>,
    isFolder: boolean
  ) => {
    e.stopPropagation()
    setIsExpanded(!addingNewItem.visible)
    setAddingNewItem({ isFolder, visible: !addingNewItem.visible })
  }

  // this is a form submission handler
  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    const form = e.currentTarget
    const formData = new FormData(form)
    const fileName = formData.get("fileItem") as string
    // if (!fileName) return

    const fileExtension = fileName?.split(".")[1]?.toLowerCase()

    // rudimentary file extension validation
    if (
      (!addingNewItem.isFolder && !fileExtension) ||
      (fileExtension && !isFileType(fileExtension))
    ) {
      setError("Invalid file extension")
      return
    }

    const fileItem: FileItem = {
      id: Date.now(),
      isFolder: addingNewItem.isFolder,
      name: fileName,
      items: addingNewItem.isFolder ? [] : undefined,
    }
    handleInsertNode(fileSystem.id, fileItem)
    setAddingNewItem({ ...addingNewItem, visible: false })
  }

  // TODO lift the selected items to global state via context to support multiple selection
  // Or maybe just listen to some dispatch event that will update the selected items since
  // they are all managing their own selected states?
  const handleSelectItem = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    setSelectedItem(!selectedItem)
  }

  //
  const handleDeleteItem = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    handleDeleteNode(fileSystem.id)
  }

  if (fileSystem.isFolder) {
    return (
      <div className='directory'>
        <div
          style={{
            ...(selectedItem ? { background: "lightGrey" } : null),
          }}
          className='folder'
          onClick={(e) => {
            handleSelectItem(e)
          }}
        >
          <span>
            <FileIcons fileType={isExpanded ? "folderOpen" : "folder"} />
            {fileSystem.name}
          </span>
          <div className='actionButtons'>
            <button onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? "Collapse" : "Expand"}
            </button>
            {selectedItem || isExpanded ? (
              <>
                <button onClick={(e) => handleNewItem(e, true)}>📁➕</button>
                <button onClick={(e) => handleNewItem(e, false)}>📄➕</button>
                <button onClick={(e) => handleDeleteItem(e)}>🗑️</button>
              </>
            ) : null}
          </div>
        </div>
        {addingNewItem.visible && (
          <div className='newItem'>
            <form onSubmit={handleSubmit}>
              <label htmlFor='fileItem'>
                <FileIcons
                  fileType={addingNewItem.isFolder ? "folder" : "txt"}
                />
                <input
                  type='text'
                  name='fileItem'
                  placeholder={
                    addingNewItem.isFolder ? "Folder name" : "File name"
                  }
                  autoFocus
                  // I'm sorry, I'm so sorry, I just wanted the form submission to work and retain the input disappearing on blur...
                  // Please forgive me 🙏🏻
                  // onBlur={() =>
                  //   setInterval(() => {
                  //     !addingNewItem.setAddingNewItem({ ...addingNewItem, visible: false })
                  //   }, 500)
                  // }
                  required
                  aria-required
                />
                {error ? <span>{error}</span> : null}
              </label>
              <button type='submit'>Save</button>
            </form>
          </div>
        )}
        {isExpanded &&
          fileSystem.items?.map((fileItem: FileItem) =>
            fileItem ? (
              <FileExplorer
                fileSystem={fileItem}
                key={fileItem.id}
                handleInsertNode={handleInsertNode}
                handleDeleteNode={handleDeleteNode}
              />
            ) : null
          )}
      </div>
    )
  } else {
    return (
      <span className='file'>
        <FileIcons fileType={fileSystem.name.split(".")[1] as FileType} />{" "}
        {fileSystem.name}{" "}
        <button onClick={(e) => handleDeleteItem(e)}>🗑️</button>
      </span>
    )
  }
}
