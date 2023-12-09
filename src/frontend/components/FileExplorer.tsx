import React, { useState } from "react"
import { FileItem } from "../App"

export const FileExplorer = ({ fileSystem }: { fileSystem: FileItem[] }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [selectedItem, setSelectedItem] = useState<FileItem | null>(null)

  // TODO add styling, icons, etc.
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <ul
        style={{
          listStyle: "none",
          paddingLeft: "1rem",
        }}
      >
        {fileSystem.map((fileItem) => (
          <li key={fileItem.id} onClick={() => setSelectedItem(fileItem)}>
            <span
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                ...(selectedItem?.id === fileItem.id
                  ? { background: "lightGrey" }
                  : null),
              }}
            >
              {fileItem.isFolder ? (isExpanded ? "📂" : "📁") : "📄"}
              {fileItem.name}
              {fileItem.isFolder ? (
                <span>
                  <button onClick={() => setIsExpanded(!isExpanded)}>
                    {isExpanded ? "Collapse" : "Expand"}
                  </button>
                  {<button>Add New</button>}
                </span>
              ) : null}
              <button>Delete</button>
            </span>
            {fileItem.isFolder && isExpanded && (
              <FileExplorer fileSystem={fileItem.items} />
            )}
          </li>
        ))}
      </ul>
      {/* add this back in when style available */}
      {/* <div>
        {selectedItem && (
          <div>
            <h3>{selectedItem.name}</h3>
            <p>{selectedItem.id}</p>
          </div>
        )}
      </div> */}
    </div>
  )
}
