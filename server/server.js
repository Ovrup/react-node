const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

const dbPassword = process.env.DB_PASSWORD;
const port = process.env.PORT;
const dbUser = process.env.DB_USER

const mongoUrl = `mongodb+srv://${dbUser}:${dbPassword}@zscaler-node.rlkr0cx.mongodb.net/dbZscaler?retryWrites=true&w=majority`

mongoose.set("strictQuery", false);
mongoose.connect(mongoUrl, { useNewUrlParser: true }, function () {
    console.log("mongodb is connected!!");
})

const attackerSchema = new mongoose.Schema({});

const CollectionZscaler = mongoose.model('CollectionZscaler', attackerSchema, 'collectionzscalers');

// This '/table' API is implemeted for the table component. This API just fetches the entire mongodb data and send to the table component in client side
app.get('/table', async (req, res) => {

    const data = await CollectionZscaler.find({})

    res.send(data)
})

/* This api is for graph component. This api queries the mongodb database based on the time range entered by user. Given the 
time range it groups the data based on time stamp and calculate the total count of attack for that particular timestamp.
Then the response is sent to the graph component.
*/
app.get('/graph_range', async (req, res) => {
    const graphData = await CollectionZscaler.aggregate([
        {
            $match: { 'timestamp': { "$gte": req.query.start, "$lte": req.query.end } }
        },
        {
            $group: { _id: "$timestamp", count: { $sum: 1 } }
        }
    ]);
    res.send(graphData)
})

app.listen(port, () => { console.log(`Server Started at port ${port}`) })