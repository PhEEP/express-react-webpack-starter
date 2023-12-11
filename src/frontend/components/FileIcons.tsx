import React from "react"
import { FileType } from "../../types/files"

type FileIconsProps = {
  fileType: FileType
  classes?: string
  children?: React.ReactNode
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
  banana: "🍌",
}

const FileIcons: React.FC<FileIconsProps> = ({
  fileType,
  classes,
  children,
}) => {
  return (
    <span className={classes}>
      {fileIcons[fileType] || ""} {children}
    </span>
  )
}

export default FileIcons
