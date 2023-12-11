import React from "react"

// Handles displaying a different state depending on the expanded state passed into it.
const FolderChevron: React.FC<{ expanded: boolean }> = ({ expanded }) => {
  return <span>{expanded ? "🙉" : "🙈"}</span>
}

export default FolderChevron
