import React from "react"

// eventuall use this to check file types and reject unsupported ones
export type FileType =
  | "folder"
  | "folderOpen"
  | "text"
  | "image"
  | "pdf"
  | "js"
  | "ts"
  | "html"
  | "css"
  | "json"
  | "xml"
  | "jsx"
  | "tsx"

type FileIconsProps = {
  fileType: FileType
  classes?: string
}

const fileIcons: Record<FileType, string> = {
  folder: "📁",
  folderOpen: "📂",
  text: "📄",
  image: "🖼️",
  pdf: "📑",
  js: "🟨",
  ts: "🔵",
  html: "🔶",
  css: "🔷",
  json: "🟩",
  xml: "🟥",
  jsx: "🟧",
  tsx: "🟦",
}

const FileIcons: React.FC<FileIconsProps> = ({ fileType, classes }) => {
  return <span className={classes}>{fileIcons[fileType] || ""}</span>
}

export default FileIcons
