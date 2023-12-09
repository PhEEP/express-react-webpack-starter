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
  const handleNewItem = (
    e: React.MouseEvent<HTMLButtonElement>,
    itemType: string
  ) => {
    e.stopPropagation()
    setIsExpanded(true)
    if (itemType === "folder") {
      console.log("Creating new folder in: ", fileSystem.id)
    }
    if (itemType === "file") {
      console.log("Creating new file in: ", fileSystem.id)
    }
  }
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
          onClick={() => setSelectedItem(fileSystem)}
        >
          <span>
            {isExpanded ? "📂" : "📁"} {fileSystem.name}
          </span>
          <div className='actionButtons'>
            <button onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? "Collapse" : "Expand"}
            </button>
            <button onClick={(e) => handleNewItem(e, "folder")}>➕📁</button>
            <button onClick={(e) => handleNewItem(e, "file")}>➕📄</button>
            <button onClick={(e) => handleDeleteItem(e, fileSystem.id)}>
              🗑️
            </button>
          </div>
        </div>
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
