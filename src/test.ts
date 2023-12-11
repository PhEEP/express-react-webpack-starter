function runAllTests() {
  const appContext = (require as any).context("..", true, /\.spec\.tsx?$/)
  // not sure why this isn't skipping the test file
  const excludedFiles = ["./frontend/components/fileExplorer.spec.ts"]
  appContext.keys().forEach((key: string) => {
    if (!excludedFiles.includes(key)) {
      appContext(key)
    }
  })
}

runAllTests()
