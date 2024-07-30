/**
 * 1. Initialize this folder to be governed by npm
 * 2. Install express, morgan, mongodb and ejs
 * 3. Create the necessary structure to run the Express server.
 * npm run dev --> run the server.
 */

const express = require('express');
const logger = require('morgan');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const uri = "mongodb+srv://balam:balam@cluster0.z4ejn4b.mongodb.net/"

//Set the view engine "ejs"
app.set('view engine', 'ejs');

app.use(logger("dev"));
app.use(express.static('public'));

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
}
);

//variable to manage our database
let database;

// --------------------------------------DB function
app.get('/', async (req, res) => {

        const movies = database.collection("movies");
        const query = {};
        const options = { sort: { year: -1 }, limit: 5 }
        const documents = await movies.find(query, options).toArray();
        console.log(documents)

        res.render('index', {
            documents
        });
    } 
)

//Render home.ejs when the client do a GET request

// -----------------------------------------Setting up the server
app.listen(process.env.PORT || 3000, async () => {
    console.log('Server up.');
    try {
        await client.connect();
        database = client.db("sample_mflix");
         //Message to confirm we are connected to the DB
        console.log(`DB connection status: ok!`);

    } catch (err) {
        console.error(err);
    }
    console.log(`The server is listening correctly in the port 3000`);
});