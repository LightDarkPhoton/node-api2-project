const express = require("express")
const routerPost = require('./posts-router')

const server = express()
const port = 4000

// If I remember correctly, this basically causes our server to communicate in JSON
server.use(express.json())
server.use('/api/posts', routerPost) // Don't forget the forward slash!

server.get('/', (req, res) => {
    // Note only one of these can show up at one time. Running both somehow "cancels" each other out
    res.send('Evening')
    //res.json({ message: "The server is working!"})
})

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})