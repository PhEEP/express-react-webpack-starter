import React from "react"

const FolderChevron: React.FC<{ expanded: boolean }> = ({ expanded }) => {
  return <span>{expanded ? "🙉" : "🙈"}</span>
}

export default FolderChevron
