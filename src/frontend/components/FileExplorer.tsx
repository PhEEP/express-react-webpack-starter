import React, { useState } from "react"
import { FileItem } from "../App"
import FileIcons, { FileType } from "./FileIcons"

interface FileExplorerProps {
  fileSystem: FileItem
  handleInsertNode: (
    fileExplorer: FileItem,
    folderId: FileItem["id"],
    payload: FileItem
  ) => void
}

export const FileExplorer: React.FC<FileExplorerProps> = ({
  fileSystem,
  handleInsertNode,
}: FileExplorerProps) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [selectedItem, setSelectedItem] = useState<FileItem | null>(null)
  const [addingNewItem, setAddingNewItem] = useState({
    isFolder: false,
    visible: false,
  })

  // detangle this mess
  const handleNewItem = (
    e: React.MouseEvent<HTMLButtonElement>,
    isFolder: boolean
  ) => {
    e.stopPropagation()
    setIsExpanded(true)
    if (isFolder) {
      setAddingNewItem({ isFolder: true, visible: true })
    }
    if (!isFolder) {
      console.log("Creating new file in: ", fileSystem.id)
      setAddingNewItem({ isFolder: false, visible: true })
    }
  }

  // this is a form submission handler
  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const fileItem = formData.get("fileItem") as string
    console.log(fileItem, "isFolder: ", addingNewItem.isFolder)
  }

  // TODO lift the selected items to global state via context to support multiple selection
  // Or maybe just listen to some dispatch event that will update the selected items since
  // they are all managing their own selected states?
  const handleSelectItem = (
    e: React.MouseEvent<HTMLDivElement>,
    fileSystem: FileItem
  ) => {
    e.stopPropagation()
    if (selectedItem?.id === fileSystem.id) {
      setSelectedItem(null)
    } else {
      setSelectedItem(fileSystem)
    }
  }

  //
  const handleDeleteItem = (
    e: React.MouseEvent<HTMLButtonElement>,
    itemId: number
  ) => {
    e.stopPropagation()
    console.log("Deleting item with id: ", itemId)
  }

  if (fileSystem.isFolder) {
    return (
      <div className='directory'>
        <div
          style={{
            ...(selectedItem?.id === fileSystem.id
              ? { background: "lightGrey" }
              : null),
          }}
          className='folder'
          onClick={(e) => {
            handleSelectItem(e, fileSystem)
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
            <button onClick={(e) => handleNewItem(e, true)}>➕📁</button>
            <button onClick={(e) => handleNewItem(e, false)}>➕📄</button>
            <button onClick={(e) => handleDeleteItem(e, fileSystem.id)}>
              🗑️
            </button>
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
                  onBlur={() =>
                    setInterval(() => {
                      setAddingNewItem({ ...addingNewItem, visible: false })
                    }, 100)
                  }
                  required
                  aria-required
                />
              </label>
              <button type='submit'>Save</button>
            </form>
          </div>
        )}
        {isExpanded &&
          fileSystem.items?.map((fileItem: FileItem) => (
            <FileExplorer
              fileSystem={fileItem}
              key={fileItem.id}
              handleInsertNode={handleInsertNode}
            />
          ))}
      </div>
    )
  } else {
    return (
      <span className='file'>
        <FileIcons fileType={fileSystem.name.split(".")[1] as FileType} />{" "}
        {fileSystem.name}{" "}
        <button onClick={(e) => handleDeleteItem(e, fileSystem.id)}>🗑️</button>
      </span>
    )
  }
}
