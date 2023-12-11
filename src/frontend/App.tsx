import { useState } from "react"
import { createRoot } from "react-dom/client"
import { FileExplorer } from "./components/FileExplorer"
import "./styles.css"
import useTreeWalker from "./hooks/use-tree-walker"
import { FileItem } from "../types/files"
import { InitExplorers } from "./components/InitExplorers"

// Favoring types by default over interfaces to avoid accidentally extending
// an interface when you meant to simply create a new one
// In a project this small it may not matter, but it's a good habit to get into
// App name is passed as prop
type AppProps = {
  name: string
}

export function App({ name }: AppProps) {
  // our file explorer state, holds the entire file system
  // may be better to use useReducer here, or even a global state management solution
  // like Redux
  const [fileExplorer, setFileExplorer] = useState<FileItem | null>(null)
  const [explorers, setExplorers] = useState<number[]>([])
  // favor object state for data lifecycle management
  const [fetchLifecycle, setFetchLifecycle] = useState({
    loading: false,
    error: "",
    complete: false,
  })

  const { deleteNode, insertNode } = useTreeWalker()

  const handleInsertNode = (folderId: FileItem["id"], payload: FileItem) => {
    // create a tree with the new node inserted
    const finalTree = insertNode(fileExplorer as FileItem, folderId, payload)
    // update the file explorer state with the new tree
    setFileExplorer(finalTree)
  }

  const handleAddExplorerView = () => {
    setExplorers([...explorers, explorers.length + 1])
  }

  const handleDeleteNode = (id: FileItem["id"]) => {
    // create a tree with the new node inserted
    const finalTree = deleteNode(fileExplorer as FileItem, id)
    // update the file explorer state with the new tree
    setFileExplorer(finalTree)
  }

  const initFileExplorer = async () => {
    try {
      setFetchLifecycle({
        ...fetchLifecycle,
        loading: true,
        error: "",
      })
      // Simulate network request delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      const response = await fetch("/api/initializeFileExplorer", {
        method: "GET",
      })

      if (response.ok) {
        handleAddExplorerView()
        setFileExplorer(await response.json())
        setFetchLifecycle({
          loading: false,
          error: "",
          complete: true,
        })
      } else {
        setFetchLifecycle({
          loading: false,
          error: "Failed to initialize file explorer",
          complete: false,
        })
        throw new Error("Failed to initialize file explorer")
      }
    } catch (error) {
      setFetchLifecycle({
        loading: false,
        error: "Failed to initialize file explorer",
        complete: false,
      })
    } finally {
      // Handle cleanup here
      // Canceling any ongoing network requests or subscriptions.
      // Resetting any temporary variables or flags.
      // Clearing any cached data or state.
      // Releasing any acquired resources, such as closing database connections or file handles.
    }
  }

  return (
    <div className='app-wrapper'>
      <h1>{name}</h1>
      <InitExplorers
        fetchLifecycle={fetchLifecycle}
        handleOnClick={initFileExplorer}
      />
      <button onClick={handleAddExplorerView}>Add Explorer</button>

      <div className='explorers'>
        {fileExplorer
          ? explorers.map((explorer) => (
              <FileExplorer
                fileSystem={fileExplorer}
                handleInsertNode={handleInsertNode}
                handleDeleteNode={handleDeleteNode}
                key={explorer}
              />
            ))
          : null}
      </div>
    </div>
  )
}

export function start() {
  const rootElem = document.getElementById("main")
  if (rootElem) {
    const root = createRoot(rootElem)
    root.render(<App name="Philippe's File Explorer" />)
  }
}
