import React, { useState } from "react"
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
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { insertNode } = useTreeWalker()

  const handleInsertNode = (
    fileExplorer: FileItem,
    folderId: FileItem["id"],
    payload: FileItem
  ) => {
    const finalTree = insertNode(fileExplorer, folderId, payload)
    setFileExplorer(finalTree)
  }

  // useEffect(() => {
  //   initFileExplorer()
  // }, [])

  const initFileExplorer = async () => {
    try {
      // Simulate network request delay
      setLoading(true)
      setError(false)
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const response = await fetch("/api/initializeFileExplorer", {
        method: "GET",
      })

      if (response.ok) {
        setFileExplorer(await response.json())
      } else {
        throw new Error("Failed to initialize file explorer")
      }
    } catch (error) {
      setError(error)
      // Handle error here
    } finally {
      // Set loading state to false
      setLoading(false)
    }
  }

  return (
    <>
      <h1>{name}</h1>
      <button onClick={() => initFileExplorer()}>Demo</button>
      {loading ? (
        <div>
          <h2>Fetching files</h2>
          {/* TODO actual spinner for loading state */}
          <div className='back-and-forth'>
            <span>🦔</span>
          </div>
        </div>
      ) : null}
      {error ? (
        <div>
          <h2>Error</h2>
          <p>Failed to initialize file explorer.</p>
        </div>
      ) : null}

      {fileExplorer ? (
        <FileExplorer
          fileSystem={fileExplorer}
          handleInsertNode={handleInsertNode}
        />
      ) : null}
    </>
  )
}

export function start() {
  const rootElem = document.getElementById("main")
  const root = createRoot(rootElem)
  root.render(<App name="Philippe's Phile Explorer" />)
}
