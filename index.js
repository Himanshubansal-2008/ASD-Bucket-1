const express = require('express')
const fs = require('fs/promises')
const dotenv = require('dotenv')
const path = require('path')

const cache={};
const itemCache = {};
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


async function readFileDelay() {
    try {
        await new Promise((resolve) => {
            setTimeout(resolve, 1500);
        });

        return await readFile();

    } catch (err) {
        console.log(err);
    }
}

app.get('/products', async (req,res) => {
    try{
        let key = req.url;
        let value = cache[key];

        if (value){ //cache hit
            res.set("X-cache","HIT")
            res.json(value)
            return
        }

        let products = await readFileDelay();
        res.json(products)
        cache[key] = products;
        res.set("X-cache","MISS")
    }catch(err){
        console.log(err)
    }
   
})


app.get('/products/:id', async (req,res) => {
    try{

        let {id} = req.params
        id = Number(id)
        
        let products = await readFileDelay()
        
        let product = products.find((item) => item.id===id)
        if (product){
            res.json(product)
            return
        }

    }catch(err){
        res.status(500).send("Server Error")
    }
    
})




const port = process.env.PORT || 3005
app.listen(port, () => {
    console.log(`Server running http://localhost:${port}/`)
})
