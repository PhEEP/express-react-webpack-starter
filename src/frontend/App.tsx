import React, { useState, useEffect } from "react"
import { createRoot } from "react-dom/client"
import { FileExplorer } from "./components/FileExplorer"
import "./styles.css"
import useTreeWalker from "./hooks/use-tree-walker"

// App name is passed as prop
interface AppProps {
  name: string
}

// FileItem is a recursive type which describes a folder or a file
export type FileItem = {
  id: number
  isFolder: boolean
  items?: FileItem[]
  name: string
}

export function App({ name }: AppProps) {
  const [fileExplorer, setFileExplorer] = useState<FileItem | null>(null)
  const { insertNode } = useTreeWalker()

  const handleInsertNode = (
    fileExplorer: FileItem,
    folderId: FileItem["id"],
    payload: FileItem
  ) => {
    const finalTree = insertNode(fileExplorer, folderId, payload)
    setFileExplorer(finalTree)
  }
  useEffect(() => {
    initFileExplorer()
  }, [])

  const initFileExplorer = async () => {
    const response = await fetch("/api/initializeFileExplorer", {
      method: "GET",
    })
    if (response.ok) {
      setFileExplorer(await response.json())
    }
  }

  return (
    <>
      <h1>{name}</h1>
      <button onClick={initFileExplorer}>Demo</button>
      {fileExplorer && (
        <FileExplorer
          fileSystem={fileExplorer}
          handleInsertNode={handleInsertNode}
        />
      )}
      <pre>{JSON.stringify(fileExplorer, null, 2)}</pre>
    </>
  )
}

export function start() {
  const rootElem = document.getElementById("main")
  const root = createRoot(rootElem)
  root.render(<App name="Philippe's Phile Explorer" />)
}
