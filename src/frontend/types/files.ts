// eventuall use this to check file types and reject unsupported ones
export type FileType =
  | "folder"
  | "folderOpen"
  | "txt"
  | "pdf"
  | "js"
  | "ts"
  | "html"
  | "css"
  | "json"
  | "xml"
  | "jsx"
  | "tsx"
  | "jpg"
  | "png"
  | "gif"

const FileTypes: FileType[] = [
  "folder",
  "folderOpen",
  "txt",
  "pdf",
  "js",
  "ts",
  "html",
  "css",
  "json",
  "xml",
  "jsx",
  "tsx",
  "jpg",
  "png",
  "gif",
]

export const isFileType = (value: string): value is FileType => {
  return FileTypes.includes(value as FileType)
}
