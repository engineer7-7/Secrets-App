// HINTS:

// 5. Use axios to get a random secret and pass it to index.ejs to display the
// secret and the username of the secret.

// 6. Listen to your predefined port and start the server.

// import libraries
import express from "express";
import axios from "axios";
import bodyParser from "body-parser";


// create an instance of express framework and initialize the port
const app = express();
const port = 3000;

const BASE_URL = "https://secrets-api.appbrewery.com";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

// create get-route to display the main HTML page
app.get("/", (req, res) => {
    res.render("index.ejs", {secret: null, user: null});
})


// create get-route to get a random secret
app.get('/secret', async (req, res) => {
    try {
        const response = await axios.get(BASE_URL + "/random");
        const data = response.data;
        const secret = data.secret;
        console.log("secret:", secret);
        const user = data.username;
        console.log("user:", user);
        res.render("index.ejs", {secret: secret, user: user});
    } catch (err) {
        console.error(err.message);
    }

})


// run the app
app.listen(port, () => {
    console.log(`Server is running on port: http://localhost:${port}`);
});
