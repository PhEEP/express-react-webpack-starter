import FileIcons from "./FileIcons"

/**
 * Props for the NewFileItemForm component.
 */
type NewFileItemProps = {
  handleSubmit: (e: React.SyntheticEvent<HTMLFormElement>) => void
  error: string
  addingNewItem: {
    isFolder: boolean
    visible: boolean
  }
}

/**
 * Form component for creating a new file item.
 * @param handleSubmit - Function to handle form submission.
 * @param error - Error message to display, if any.
 * @param addingNewItem - Object representing the new item being added.
 */
export const NewFileItemForm: React.FC<NewFileItemProps> = ({
  handleSubmit,
  error,
  addingNewItem,
}) => {
  return (
    <form onSubmit={handleSubmit} className='newItem'>
      <label htmlFor='fileItem'>
        <FileIcons fileType={addingNewItem.isFolder ? "folder" : "txt"} />
        <input
          type='text'
          name='fileItem'
          placeholder={addingNewItem.isFolder ? "Folder name" : "File name"}
          autoFocus
          required
          aria-required
        />
        {error ? <span>{error}</span> : null}
      </label>
      <button type='submit'>Save</button>
    </form>
  )
}
