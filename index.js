const express = require('express')
const fs = require('fs')
const dotenv = require('dotenv')

const app = express()







const port = process.env.PORT
app.listen(port, () => {
    console.log(`Server running http://localhost:${port}/`)
})
