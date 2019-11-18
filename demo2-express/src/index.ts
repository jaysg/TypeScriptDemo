var express = require('express')
import bodyParser from "body-parser";
import { createServer } from "http";
import "reflect-metadata";
import { createConnection, getManager } from "typeorm";
import User from "./entity/User";

createConnection();

const app = express();
const router = express.Router();

app.get('/', function (req, res) {
    // res.json({ promote: "hellow world!" })
    res.send('GET request to the homepage')
})
router.get("", async (req, res, next) => {
    const userRepository = getManager.getRepository(User);
    try {
        const users = await userRepository.find({ order: { age: 'DESC' } });
        res.json(users);
    } catch (error) {
        next(error)
    }
})

app.use("/users", router);

app.use(bodyParser.json());

const server = createServer(app);

app.listen(3001);


// import {User} from "./entity/User";

// createConnection().then(async connection => {

//     console.log("Inserting a new user into the database...");
//     const user = new User();
//     user.firstName = "Timber";
//     user.lastName = "Saw";
//     user.age = 25;
//     await connection.manager.save(user);
//     console.log("Saved a new user with id: " + user.id);

//     console.log("Loading users from the database...");
//     const users = await connection.manager.find(User);
//     console.log("Loaded users: ", users);

//     console.log("Here you can setup and run express/koa/any other framework.");

// }).catch(error => console.log(error));
