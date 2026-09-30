const express = require('express')
const fs = require('fs/promises')
const dotenv = require('dotenv')
const path = require('path')

const app = express()
dotenv.config()
const filePath = path.join(__dirname,"data.json")

async function readFile() {
    try{
        let data = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(data);
    }catch (err){
        console.log(err);
    }
    
}


app.get('/products', async (req,res) => {
    let products = await readFile();
    res.json(products)
})


app.get('/products/:id', async (req,res) => {
    try{
        let {id} = req.params
        id = Number(id)
        
        let products = await readFile()
        
        if (id < products.length ){
            res.json(products[id])
        }else{
            res.json({"error":"Id Not Found"})
        }

    }catch(err){
        res.status(500).send("Server Error")
    }
    
    // if (id < products.length ){
    //     res.json(products[id])
    // }else{
    //     res.json({"error":"ID Not Found"})
    // }
    
})




const port = process.env.PORT
app.listen(port, () => {
    console.log(`Server running http://localhost:${port}/`)
})
