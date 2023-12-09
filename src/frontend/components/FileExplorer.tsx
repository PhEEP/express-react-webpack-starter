import React, { useState } from "react"
import { FileItem } from "../App"

interface FileExplorerProps {
  fileSystem: FileItem
}

export const FileExplorer: React.FC<FileExplorerProps> = ({
  fileSystem,
}: FileExplorerProps) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [selectedItem, setSelectedItem] = useState<FileItem | null>(null)
  const [addingNewItem, setAddingNewItem] = useState({
    isFolder: false,
    visible: false,
  })

  const handleNewItem = (
    e: React.MouseEvent<HTMLButtonElement>,
    isFolder: boolean
  ) => {
    e.stopPropagation()
    setIsExpanded(true)
    if (isFolder) {
      console.log("Creating new folder in: ", fileSystem.id)
      setAddingNewItem({ isFolder: true, visible: true })
    }
    if (!isFolder) {
      console.log("Creating new file in: ", fileSystem.id)
      setAddingNewItem({ isFolder: false, visible: true })
    }
  }

  const handleSelectItem = (
    e: React.MouseEvent<HTMLDivElement>,
    fileSystem: FileItem
  ) => {
    e.stopPropagation()
    setSelectedItem(fileSystem)
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
            {isExpanded ? "📂" : "📁"} {fileSystem.name}
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
            {addingNewItem.isFolder ? "📁" : "📄"}
            <input
              type='text'
              placeholder={addingNewItem.isFolder ? "Folder name" : "File name"}
              autoFocus
              onBlur={() =>
                setAddingNewItem({ ...addingNewItem, visible: false })
              }
            />
            <button>Save</button>
          </div>
        )}
        {isExpanded &&
          fileSystem.items?.map((fileItem: FileItem) => (
            <FileExplorer fileSystem={fileItem} key={fileItem.id} />
          ))}
      </div>
    )
  } else {
    return (
      <span className='file'>
        📄 {fileSystem.name}{" "}
        <button onClick={(e) => handleDeleteItem(e, fileSystem.id)}>🗑️</button>
      </span>
    )
  }
}
