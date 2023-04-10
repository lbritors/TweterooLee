import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const user = [];
const tweets = [];


app.post("/sign-up", (req, res) => {
    const {username, avatar} = req.body;
    if(typeof username !== "string" || username === "" || typeof avatar !== "string" || avatar === ""){
        res.status(400).send("Todos os campos são obrigatórios!");
        return;
    } else {
        const person = {username, avatar};
        user.push(person);
        return res.status(201).send("OK");
    }
   

});

app.post("/tweets", (req, res) =>{
    const {username, tweet} = req.body;
    const body = req.body;
    const tweetExists = body.hasOwnProperty("tweet");
    console.log(tweetExists);
    const userExists = user.find(u => u.username === username);
    if(!userExists) {
        return res.status(401).send("UNAUTHORIZED");
    }
    if(tweet === "" || tweetExists === false || typeof tweet !== "string") {
        res.status(400).send("Todos os dados são obrigatórios!");
    } 
    const newTweet = {username, tweet};
    tweets.push(newTweet);
    return res.status(201).send("OK");

});

app.get("/tweets", (req, res) => {
    if(tweets.length === 0) {
        return res.send(tweets);
    }
    const result = tweets.slice(-10);
    const complete = result.map(t => {
        const match = user.find(u => t.username === u.username);
        return {...t, avatar: match.avatar};
        
    });
    res.send(complete);

});


app.listen(5000, () => {
    console.log("localhost");
});