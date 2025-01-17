// I'm used to using the react-testing library so I've scaffolded out some tests here.
// Instead of losing time on feature development by learning a new testing framework I'm going to keep developing against the extension requirements.
// I would normally take the time to learn the testing framework from examples already in the codebase and then write tests for the backend and frontend.

import { render, fireEvent, prettyDOM } from "@testing-library/react"
import { FileExplorer } from "./FileExplorer"
import { FileItem } from "../../types/files"

// Mock file system
const mockFileSystem: FileItem = {
  id: 1,
  name: "root",
  isFolder: true,
  items: [
    {
      id: 2,
      name: "file1",
      isFolder: false,
      items: [],
    },
    {
      id: 3,
      name: "folder1",
      isFolder: true,
      items: [],
    },
  ],
}

const handleInsertNode = jest.fn()
const handleDeleteNode = jest.fn()

describe("FileExplorer", () => {
  it("renders FileExplorer", () => {
    const { getByText } = render(
      <FileExplorer
        fileSystem={mockFileSystem}
        handleInsertNode={handleInsertNode}
        handleDeleteNode={handleDeleteNode}
      />
    )

    // Check if the root folder is rendered
    expect(getByText("root")).toBeTruthy()
  })

  it("toggles isExpanded state when a folder is expanded", () => {
    const { getByText } = render(
      <FileExplorer
        fileSystem={mockFileSystem}
        handleInsertNode={handleInsertNode}
        handleDeleteNode={handleDeleteNode}
      />
    )

    // Click on the folder add button
    // TODO actually target the button for that folder, maybe first child or something like that
    fireEvent.click(getByText("➕"))

    // Check if the folder is expanded
    expect(getByText("file1")).toBeTruthy()
  })

  it("sets selectedItem state when a FileItem is clicked", () => {
    const { getByText, container } = render(
      <FileExplorer
        fileSystem={mockFileSystem}
        handleInsertNode={handleInsertNode}
        handleDeleteNode={handleDeleteNode}
      />
    )

    // Click on the file
    fireEvent.click(getByText("root"))
    console.log(prettyDOM(container))
    // check if the element with class 'folder' has the background color lightGrey
    // this test is slightly brittle because it relies on the css class name which may change or be duplicated
    expect(container.getElementsByClassName("folder")[0]).toHaveClass(
      "selected"
    )
  })
})
