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
  const [fetchLifecycle, setFetchLifecycle] = useState({
    loading: false,
    error: "",
    idle: true,
    complete: false,
  })
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
      setFetchLifecycle({
        ...fetchLifecycle,
        loading: true,
        error: "",
        idle: false,
      })
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const response = await fetch("/api/initializeFileExplorer", {
        method: "GET",
      })

      if (response.ok) {
        setFileExplorer(await response.json())
        setFetchLifecycle({
          loading: false,
          error: "",
          idle: false,
          complete: true,
        })
      } else {
        setFetchLifecycle({
          loading: false,
          error: "Failed to initialize file explorer",
          idle: false,
          complete: false,
        })
        throw new Error("Failed to initialize file explorer")
      }
    } catch (error) {
      setFetchLifecycle({
        loading: false,
        error: "Failed to initialize file explorer",
        idle: false,
        complete: false,
      })
      // Handle error here
    } finally {
      // Set loading state to false
      setFetchLifecycle({
        ...fetchLifecycle,
        idle: true,
      })
    }
  }

  return (
    <div className='app-wrapper'>
      <h1>{name}</h1>
      {!fetchLifecycle.complete && !fetchLifecycle.loading ? (
        <button onClick={() => initFileExplorer()}>Demo</button>
      ) : null}
      {fetchLifecycle.loading ? (
        <div>
          <h2>Fetching files</h2>
          {/* TODO actual spinner for loading state */}
          <div className='back-and-forth'>
            <span>🦔</span>
          </div>
        </div>
      ) : null}
      {fetchLifecycle.error ? (
        <div>
          <h2>Error</h2>
          <p>{fetchLifecycle.error}</p>
        </div>
      ) : null}

      {fileExplorer ? (
        <FileExplorer
          fileSystem={fileExplorer}
          handleInsertNode={handleInsertNode}
        />
      ) : null}
    </div>
  )
}

export function start() {
  const rootElem = document.getElementById("main")
  const root = createRoot(rootElem)
  root.render(<App name="Philippe's Phile Explorer" />)
}
