import React, { useState } from "react"
import { FileItem } from "../App"

export const FileExplorer = ({ fileSystem }: { fileSystem: FileItem[] }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null)

  const handleClick = (fileItem: FileItem) => {
    if (fileItem.isFolder) {
      setIsExpanded(!isExpanded)
    } else {
      setSelectedFile(fileItem)
    }
  }

  return (
    <div>
      <ul
        style={{
          listStyle: "none",
          paddingLeft: "1rem",
        }}
      >
        {fileSystem.map((fileItem) => (
          <li key={fileItem.id} onClick={() => handleClick(fileItem)}>
            {fileItem.name}
            {fileItem.isFolder && isExpanded && (
              <FileExplorer fileSystem={fileItem.items} />
            )}
          </li>
        ))}
      </ul>
      <div>
        {selectedFile && (
          <div>
            <h3>{selectedFile.name}</h3>
            <p>{selectedFile.id}</p>
          </div>
        )}
      </div>
    </div>
  )
}
