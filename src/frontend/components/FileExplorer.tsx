import React, { useState } from "react"
import { FileItem } from "../App"

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
      // onAddItem(e)

      setAddingNewItem({ isFolder: true, visible: true })
    }
    if (!isFolder) {
      console.log("Creating new file in: ", fileSystem.id)
      setAddingNewItem({ isFolder: false, visible: true })
    }
  }

  // TODO support mouse events with a button click for mobile
  // const onAddItem = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (e instanceof KeyboardEvent) {
  //     if (e.key === "Enter") {
  //       handleInsertNode(fileSystem, fileSystem.id, {
  //         id: new Date().getTime(),
  //         isFolder: true,
  //         name: e.currentTarget.value,
  //       })
  //     }
  //   } else if (e instanceof MouseEvent) {
  //     // handle mouse or touch event
  //   }
  // }

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
        📄 {fileSystem.name}{" "}
        <button onClick={(e) => handleDeleteItem(e, fileSystem.id)}>🗑️</button>
      </span>
    )
  }
}
