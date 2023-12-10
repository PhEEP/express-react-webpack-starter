import React from "react"
import { FileType } from "../../types/files"

type FileIconsProps = {
  fileType: FileType
  classes?: string
}

const fileIcons: Record<FileType, string> = {
  folder: "📁",
  folderOpen: "📂",
  txt: "📄",
  jpg: "🖼️",
  png: "🖼️",
  gif: "🖼️",
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
