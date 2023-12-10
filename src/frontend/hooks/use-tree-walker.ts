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
  // support adding to nodes past the first level
  function insertNode(
    tree: FileItem,
    folderId: number,
    payload: FileItem
  ): FileItem {
    // if our current tree is the folder we want to insert into
    // and it is a folder, then we insert
    if (tree.id === folderId && tree.isFolder) {
      // inserts at beginning of items array
      tree.items.unshift(payload)
      return tree
    }
    // lastNode is the result of inserting into each of the children
    let lastNode: FileItem[]
    lastNode = tree.items?.map((item) => {
      return insertNode(item, folderId, payload)
    })
    // return the tree with the lastNode inserted
    return { ...tree, items: lastNode }
  }

  return { insertNode }
}

export default useTreeWalker
