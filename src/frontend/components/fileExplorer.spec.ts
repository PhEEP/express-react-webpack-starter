// // I'm used to using the react-testing library so I've scaffolded out some tests here.
// // Instead of losing time on feature development by learning a new testing framework I'm going to keep developing against the extension requirements.
// // I would normally take the time to learn the testing framework from examples already in the codebase and then write tests for the backend and frontend.

// import React from "react"
// import { render, fireEvent } from "@testing-library/react"
// import { FileExplorer } from "./FileExplorer"
// import { FileItem } from "../App"

// // Mock file system
// const mockFileSystem: FileItem = {
//   id: 1,
//   name: "root",
//   isFolder: true,
//   items: [
//     {
//       id: 2,
//       name: "file1",
//       isFolder: false,
//       items: [],
//     },
//     {
//       id: 3,
//       name: "folder1",
//       isFolder: true,
//       items: [],
//     },
//   ],
// }

// test("FileExplorer", () => {
//   it("renders FileExplorer", () => {
//     const { getByText } = render(<FileExplorer fileSystem={mockFileSystem} />)

//     // Check if the root folder is rendered
//     expect(getByText("root")).toBeTruthy()
//   })

//   it("toggles isExpanded state when a folder is clicked", () => {
//     const { getByText } = render(<FileExplorer fileSystem={mockFileSystem} />)

//     // Click on the folder add button
//     // TODO actually target the button for that folder, maybe first child or something like that
//     fireEvent.click(getByText("folder1"))

//     // Check if the folder is expanded
//     expect(getByText("file1")).toBeTruthy()
//   })

//   it("sets selectedItem state when a file is clicked", () => {
//     const { getByText } = render(<FileExplorer fileSystem={mockFileSystem} />)

//     // Click on the file
//     fireEvent.click(getByText("file1"))

//     // Check if the file is selected
//     expect(getByText("file1")).toHaveClass("selected")
//   })
// })
