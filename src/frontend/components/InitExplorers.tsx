import React from "react"
export function InitExplorers({
  fetchLifecycle,
  handleOnClick,
}: {
  fetchLifecycle: {
    loading: boolean
    error: string
    complete: boolean
  }
  handleOnClick: () => void
}) {
  return (
    <>
      {/* Only render the demo button when not loading or complete */}
      {fetchLifecycle.complete || fetchLifecycle.loading ? null : (
        <button onClick={handleOnClick}>Demo</button>
      )}
      {fetchLifecycle.loading ? (
        <div>
          <h2>Fetching files</h2>
          {/* TODO actual spinner for loading state */}
          <div className='back-and-forth'>
            <span>🦔</span>
          </div>
        </div>
      ) : null}
      {fetchLifecycle.error ? (
        <div>
          <h2>Error</h2>
          <p>{fetchLifecycle.error}</p>
        </div>
      ) : null}
    </>
  )
}
