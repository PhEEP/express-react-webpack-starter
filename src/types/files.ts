// FileItem is a recursive type which describes a folder or a file
export type FileItem = {
  id: number
  isFolder: boolean
  items?: FileItem[]
  name: string
}

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
  | "banana"

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
  "banana",
]

export const isFileType = (value: string): value is FileType => {
  return FileTypes.includes(value as FileType)
}
