import * as express from "express"
import * as path from "path"
import { files } from "./data/files"

var app = express()

// Simple endpoint that returns the current time
app.get("/api/initializeFileExplorer", function (req, res) {
  res.send(JSON.stringify(files))
})

// Serve static files
app.use("/", express.static(path.join(__dirname, "/www")))

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
