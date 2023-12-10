import { FileItem } from "../../types/files"

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
    // If our current tree is the folder where we want to insert, and it is a folder
    if (tree.id === folderId && tree.isFolder) {
      // Insert at the beginning of items array
      return {
        ...tree,
        items: [payload, ...tree.items],
      }
    }

    // Otherwise, continue recursively
    let updatedItems: FileItem[] =
      tree.items?.map((item) => {
        const updatedItem = insertNode(item, folderId, payload)
        return updatedItem || item // Keep the original item if it wasn't modified
      }) || []

    // Return the tree with the updated items
    return {
      ...tree,
      items: updatedItems,
    }
  }

  /**
   * Deletes a node from the tree
   * @param tree the tree to delete from
   * @param id the id of the node to delete
   * @returns the tree with the node deleted or null if the node is the root
   */
  function deleteNode(tree: FileItem, id: number): FileItem | null {
    // if the current tree is the node to delete, then we delete
    if (tree.id === id) {
      return null
    }

    // lastNode is the result of deleting from each of the children
    let lastNode: FileItem[] | null = tree.items?.map((item) => {
      return deleteNode(item, id)
    })

    // Filter out null entries (deleted nodes)
    lastNode = lastNode?.filter((node) => node !== null) as FileItem[]

    // return the tree with the lastNode deleted
    return { ...tree, items: lastNode }
  }

  return { deleteNode, insertNode }
}

export default useTreeWalker
