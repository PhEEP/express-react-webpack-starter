import React, { useCallback, useState } from "react"
import FileIcons from "./FileIcons"
import { isFileType, type FileType, type FileItem } from "../../types/files"
import { NewFileItemForm } from "./NewFileItemForm"
import FolderChevron from "./FolderChevron"

interface FileExplorerProps {
  fileSystem: FileItem
  handleInsertNode: (folderId: FileItem["id"], payload: FileItem) => void
  handleDeleteNode: (id: FileItem["id"]) => void
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

  const handleNewItem = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>, isFolder: boolean) => {
      e.stopPropagation()
      // if we're tryingt to create a new item, we need to expand the folder
      setIsExpanded(() => true)
      setAddingNewItem((prevAddingNewItem) => ({
        ...prevAddingNewItem,
        isFolder,
        visible: !prevAddingNewItem.visible,
      }))
    },
    [setIsExpanded, setAddingNewItem]
  )

  // this is a form submission handler
  const handleSubmit = useCallback(
    (e: React.SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault()
      setError("")
      const form = e.currentTarget
      const formData = new FormData(form)
      const fileName = formData.get("fileItem") as string
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
        name: fileName, //use lowercase file extension
        items: addingNewItem.isFolder ? [] : undefined,
      }
      handleInsertNode(fileSystem.id, fileItem)
      setAddingNewItem({ ...addingNewItem, visible: false })
    },
    [setAddingNewItem, addingNewItem, handleInsertNode, fileSystem]
  )

  // TODO lift the selected items to global state via context to support multiple selection
  // Or maybe just listen to some dispatch event that will update the selected items since
  // they are all managing their own selected states?
  const handleSelectItem = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    setSelectedItem(!selectedItem)
  }

  const handleDeleteItem = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    handleDeleteNode(fileSystem.id)
  }

  const handleExpandFolder = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setIsExpanded((prevExpanded) => !prevExpanded)
  }

  if (fileSystem.isFolder) {
    return (
      <div className='directory'>
        <div
          className={`folder ${selectedItem ? "selected" : ""}`}
          onClick={(e) => {
            handleSelectItem(e)
          }}
        >
          <FileIcons fileType={isExpanded ? "folderOpen" : "folder"}>
            {fileSystem.name}
          </FileIcons>
          <div className='actionButtons'>
            {selectedItem || isExpanded ? (
              <>
                <button onClick={(e) => handleNewItem(e, true)}>📁➕</button>
                <button onClick={(e) => handleNewItem(e, false)}>📄➕</button>
                <button onClick={(e) => handleDeleteItem(e)}>🗑️</button>
              </>
            ) : null}
            <button onClick={handleExpandFolder}>
              <FolderChevron expanded={isExpanded} />
            </button>
          </div>
        </div>
        {addingNewItem.visible && (
          <NewFileItemForm
            handleSubmit={handleSubmit}
            error={error}
            addingNewItem={addingNewItem}
          />
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
      <span
        className={`file ${selectedItem ? "selected" : ""}`}
        onClick={handleSelectItem}
      >
        <FileIcons
          fileType={fileSystem.name.split(".")[1].toLowerCase() as FileType}
        >
          {fileSystem.name}
        </FileIcons>
        {selectedItem ? (
          <button onClick={(e) => handleDeleteItem(e)}>🗑️</button>
        ) : null}
      </span>
    )
  }
}
