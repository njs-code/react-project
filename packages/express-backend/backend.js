import express from "express";
import cors from "cors";

//create express application 
const app = express();
const port = 8000;

//enable CORS requests
app.use(cors());

//process in JSON
app.use(express.json());

const users = {
    users_list: [
      {
        id: "xmp789",
        name: "Charlie",
        job: "Electrician"
      },
      {
        id: "abc123",
        name: "Mac",
        job: "Bouncer"
      },
      {
        id: "ppp222",
        name: "Mac",
        job: "Professor"
      },
      {
        id: "yat999",
        name: "Dee",
        job: "Aspring actress"
      },
      {
        id: "zap555",
        name: "Dennis",
        job: "Bartender"
      }
    ]
  };

        // ============= GET endpoints =============
//Return a very basic page
app.get('/', (req,res) => {
    res.send("Hello, World!");
});

const findUserByName = (name)=> {
  //return matching users
  return users["users_list"].filter(
    (user) => user["name"] === name
  );
};

//return matching users to job and name
const findUserByNameandJob = (name, job)=> {
  return users["users_list"].filter(
    (user) => user["name"] === name && user["job"] === job
  );
};

//return matching users to job
const findUserByJob = (job) => {
  return users.users_list.filter((user) => user.job === job)
};

//return multiple users by any combination of name or job
app.get("/users", (req,res)=>{
    const name = req.query.name;
    const job = req.query.job;
    //search matching names and jobs
    if (job != undefined && name != undefined){
      let result = findUserByNameandJob(name, job);
      result = {users_list : result};
      res.send(result);
    }
    //search matching names
    else if (name != undefined && job == undefined){
      let result = findUserByName(name);
      result = {users_list: result};
      res.send(result);
    }
    //search matching jobs
    else if (name == undefined && job != undefined){
      let result = findUserByJob(job);
      result = {users_list : result};
      res.send(result);
    }
    //otherwise send all users
    else {
      res.send(users);
    }
});

//return user by id
const findUserById = (id) => 
  users["users_list"].find((user) => user["id"] === id);

//get endpoint for user by ID
app.get("/users/:id", (req, res) => {
  const id = req.params["id"];
  let result = findUserById(id);
  if (result === undefined){
    res.status(404).send("Resource not found.");
  } else{
    res.send(result);
  }
});

        // =============  POST user endpoints ===========
//add to users_list
const addUser = (user) => {
  users["users_list"].push(user);
  return users["users_list"].includes(user);
}

//generate new user ID
const generateId = () => {
  let id; 
  do {
    id = Math.floor(Math.random() * 100000);
    console.log(users["users_list"].includes(id));
  } while (users["users_list"].includes(id));
  return id; 
}

//receive POST request to add user
app.post("/users", (req, res) => {
  const newUser = req.body; 
  newUser.id = `${generateId()}`;
  console.log("New user ID", newUser.id);
  let success = addUser(newUser);
  if (success !== true){
    console.log("Failed to add user ", newUser.name)
    res.status(500).send("Error adding user");
  } else{
    console.log("Added user: ", newUser);
    res.status(201).json(newUser);
  }
});

          // ==========    DELETE user endpoint ============
//remove a user from users_list
const removeUser = (user) => {
  users["users_list"] = users["users_list"].filter((usr) => usr.id !== user.id);
  return !users["users_list"].includes(user);
}

//receive a delete request
app.delete("/users/:id", (req, res) => {
  //find id
  const id = req.params["id"];
  //return user with id
  const user = findUserById(id);
  //error if user does not exist
  if (user === undefined){
    res.status(404).send("User does not exist");
  }
  //attempt remove, return false if user is still in the list
  let success = removeUser(user);
  //if removal failed, throw error
  if (success !== true){
    console.log("Failed to remove user ", user)
    res.status(500).send("Error removing user");
  //else return 204 and user object
  } else{
    console.log("Removed user: ", user);
    res.status(204).send();
  }
})

app.listen(port, () => {
    console.log(
        `Example app listening at http://localhost:${port}`
    )
})
