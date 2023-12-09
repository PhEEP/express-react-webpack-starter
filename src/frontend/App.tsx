import * as React from "react"
import { createRoot } from "react-dom/client"

interface AppProps {
  name: string
}

type FileItem = {
  id: number
  isFolder: boolean
  items: FileItem[]
  name: string
}

interface AppState {
  fileExplorer: FileItem[] | null
}

export class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props)
    this.state = {
      fileExplorer: null,
    }
  }

  componentDidMount() {
    this.getTime()
    setInterval(this.getTime, 2000)
  }

  render() {
    const { name } = this.props
    const { fileExplorer } = this.state
    return (
      <>
        <h1>{name}</h1>
        <pre>{JSON.stringify(fileExplorer, null, 2)}</pre>
      </>
    )
  }

  private getTime = async () => {
    const response = await fetch("/api/initializeFileExplorer", {
      method: "GET",
    })
    if (response.ok) {
      this.setState({ fileExplorer: await response.json() })
    }
  }
}

export function start() {
  const rootElem = document.getElementById("main")
  const root = createRoot(rootElem)
  root.render(<App name="Philippe's Phile Explorer" />)
}
