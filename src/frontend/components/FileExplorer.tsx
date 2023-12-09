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
  // TODO add styling, icons, etc.
  if (fileSystem.isFolder) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          paddingLeft: "1rem",
        }}
      >
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
            <button>➕📁</button>
            <button>➕📄</button>
            <button>🗑️</button>
          </div>
        </div>
        {isExpanded &&
          fileSystem.items?.map((fileItem: FileItem) => (
            <FileExplorer fileSystem={fileItem} />
          ))}
      </div>
    )
  } else {
    return <span className='file'>📄 {fileSystem.name}</span>
  }
}
