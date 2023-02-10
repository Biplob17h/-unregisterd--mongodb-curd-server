const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = 5000;

// midlewire
app.use(cors());
app.use(express.json());

// app
app.get('/', (req, res) => {
    res.send('node mongo curd server is running!!!!')
})

// user Id and Password
//  practice-1
//  PbinyqLBcdI4tYpm

// mongodb

const uri = "mongodb+srv://practice-1:PbinyqLBcdI4tYpm@cluster0.ro3yhcf.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const userDb = client.db('practice-1').collection('practice-x')
        app.post('/users', async(req, res)=>{
            const user = req.body;
            let result = await userDb.insertOne(user)
            res.send(result)
        })
        app.get('/users', async(req, res)=>{
            let query = {};
            let cursor = userDb.find(query);
            let users = await cursor.toArray();
            res.send(users)
        })
        app.delete('/users/:id', async(req, res)=>{
            const id = req.params.id;
            let query = {_id : new ObjectId(id)}
            let result = await userDb.deleteOne(query)
            res.send(result)
        })
        app.get('/users/:id', async(req, res)=>{
            const id = req.params.id;
            let query = {_id : new ObjectId(id)};
            let user = await userDb.findOne(query)
            res.send(user)
        })
        app.put('/users/:id', async(req, res)=>{
            const id = req.params.id;
            const user = req.body;
            const options = { upsert: true };
            let query = {_id : new ObjectId(id)}
            let updateDoc = {
                $set : {
                    name : user.name,
                    email : user.email,
                    phone : user.phone
                }
            }
            let result = await userDb.updateOne(query, updateDoc, options);
            res.send(result)
        })
    }
    finally {

    }
}
run().catch((error) => console.log(error))



app.listen(port, () => {
    console.log('server is running on port', port)
})