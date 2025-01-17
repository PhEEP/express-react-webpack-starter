import { FileItem } from "../../types/files"

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
          name: "file1.pdf",
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
              name: "file3.jpg",
              isFolder: false,
            },
          ],
        },
      ],
    },
    {
      id: 8,
      name: "file4.tsx",
      isFolder: false,
    },
  ],
}
