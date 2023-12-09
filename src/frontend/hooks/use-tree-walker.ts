import { FileItem } from "../App"

export const useTreeWalker = () => {
  function insertNode(tree: FileItem, folderId: number, payload: FileItem) {
    // if our current tree is the folder we want to insert into
    // and it is a folder, then we insert
    if (tree.id === folderId && tree.isFolder) {
      // inserts at beginning of array
      tree.items.unshift(payload)
    } else {
      // if not, we recurse
      tree.items.forEach((child) => {
        insertNode(child, folderId, payload)
      })
    }
  }

  return { insertNode }
}

export default useTreeWalker
