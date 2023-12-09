import { FileItem } from "../App"

export const useTreeWalker = () => {
  /**
   * Inserts a node into the tree
   * @param tree the tree to insert into
   * @param folderId the id of the folder to insert into
   * @param payload the payload to insert\
   * @returns the tree with the node inserted
   * Kept this function agnostic of the data being inserted to keep it more composable
   */
  function insertNode(
    tree: FileItem,
    folderId: number,
    payload: FileItem
  ): FileItem {
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
    return tree
  }

  return { insertNode }
}

export default useTreeWalker
