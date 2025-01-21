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


const findUserByNameandJob = (name, job)=> {
  //return matching users
  return users["users_list"].filter(
    (user) => user["name"] === name && user["job"] === job
  );
};

const findUserByJob = (job) => {
  return users.users_list.filter((user) => user.job === job)
};

//return multiple users 
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

const findUserById = (id) => 
  users["users_list"].find((user) => user["id"] === id);


app.get("/users/:id", (req, res) => {
  const id = req.params["id"];
  let result = findUserById(id);
  if (result === undefined){
    res.status(404).send("Resource not found.");
  } else{
    res.send(result);
  }
});

        //POST user endpoint
//add to users_list
const addUser = (user) => {
  users["users_list"].push(user);
  return users["users_list"].includes(user);
}

//receive POST request
app.post("/users", (req, res) => {
  const newUser = req.body; 
  let success = addUser(newUser);
  if (success !== true){
    console.log("Failed to add user ", newUser.name)
    res.status(500).send("Error adding user");
  } else{
    console.log("Added user: ", req.body);
    res.status(201).send('Created new user');
  }
});

          //DELETE user endpoint
//remove a user from users_list
const removeUser = (user) => {
  console.log(user);
  users["users_list"] = users["users_list"].filter((usr) => usr.id !== user.id);
  return user;
}

//receive a delete request
app.delete("/users", (req, res) => {
  const oldUser = req.body;
  removeUser(oldUser);
  console.log("removed user: ", oldUser);
  res.send();
})

//
app.listen(port, () => {
    console.log(
        `Example app listening at http://localhost:${port}`
    )
})
