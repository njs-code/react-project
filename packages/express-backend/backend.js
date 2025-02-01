import express from "express";
import cors from "cors";
import userServices from "./user-services.js";

//create express application 
const app = express();
const port = 8000;

//enable CORS requests
app.use(cors());

//process in JSON
app.use(express.json());

        // ============= GET endpoints =============
//Return a very basic page
app.get('/', (req,res) => {
    res.send("Hello, World!");
});

//return multiple users by any combination of name or job
app.get("/users", (req,res)=>{
  const name = req.query.name;
  const job = req.query.job;
  userServices.getUsers(name, job)
  .then((response) => {
    console.log("Fetched response: ", response);
    res.send(response);
  })
  .catch((err) => {
    console.log(err);
    res.send(err);
  })
});

//get endpoint for user by ID
app.get("/users/:id", (req, res) => {
  const id = req.params["id"];
  userServices.findUserById(id)
  .then((result) => {
    if (!result) {
      res.status(404).send("Resource not found.");
    } else {
      res.send(result);
    }
  }).catch((err) => {
    console.log(err);
    res.status(404).send("Error Adding user");
  })
});

// ========= DELETE user from database ==========
app.delete("/users/:id", (req, res) => {
  const id = req.params["id"];
  userServices.removeUserById(id)
  .then((query) => {
    console.log("User Removed: ", query);
    res.status(204).send("User Removed");
  })
  .catch((err) => {
    console.log(err);
    res.status(500).send("Failed to Remove User");
  })
  })

// ============== POST user to database ===============
app.post("/users", (req, res) => {
  const newUser = req.body; 
  if(!newUser.name || !newUser.job){
    console.log("Missing required field");
    res.status(400).json(newUser);
  } else {
    userServices.addUser(req.body)
    .then((usr)=> {
      console.log("Added user: ", usr);
      res.status(201).json(usr);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error adding user - validation likely failed");
    });}
});

app.listen(port, () => {
    console.log(
        `Example app listening at http://localhost:${port}`
    )
})
