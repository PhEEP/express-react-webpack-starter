import { FileItem } from "../../frontend/App"

export const files: FileItem = {
  id: 1,
  name: "root",
  isFolder: true,
  items: [
    {
      id: 2,
      name: "folder1",
      isFolder: true,
      items: [
        {
          id: 3,
          name: "file1.txt",
          isFolder: false,
        },
        {
          id: 4,
          name: "file2.txt",
          isFolder: false,
        },
      ],
    },
    {
      id: 5,
      name: "folder2",
      isFolder: true,
      items: [
        {
          id: 6,
          name: "subfolder1",
          isFolder: true,
          items: [
            {
              id: 7,
              name: "file3.txt",
              isFolder: false,
            },
          ],
        },
      ],
    },
    {
      id: 8,
      name: "file4.txt",
      isFolder: false,
    },
  ],
}
