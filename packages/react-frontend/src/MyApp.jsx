import Table from './Table';
import Form from "./Form";
import React, {useState, useEffect} from 'react';
 
function MyApp(){
    //defines characters list as state
    const [characters, setCharacters] = useState([]);

    //
    useEffect(() => {
      fetchUsers()
        .then((res)=> res.json())
        .then((json) => setCharacters(json["users_list"]))
        .catch((error) => {console.log(error);})
    }, []);

    //get users from backend
    function fetchUsers() {
      const promise = fetch("http://localhost:8000/users");
      return promise;
    }

    //Post user to backend
    function postUser(person) {
      const promise = fetch("Http://localhost:8000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(person),
      });
      return promise;
    }

    //delete user to backend
    function deleteUser(id) {
      const url = `Http://localhost:8000/users/${id}`;
      console.log(url);
      const promise = fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      });
      return promise;
    }

    //function to filter/remove a character from the state
    function removeOneCharacter(person) {
      console.log(person.id);
      deleteUser(person.id)
      .then((res) => {
        console.log("Resolved");
        if (res.status === 204){
          const updated = characters.filter((character)=>character!==person);
          setCharacters(updated);
        } else {
          throw new Error("Response not 204");
        }
      })
      .catch((error) => {
        console.log(error);
      })
      }

    //function to add a character to the state
    function addUser(person){
      postUser(person)
        .then((res) => {
          if (res.status !== 201){
            throw new Error("Failed to create user");
          }
          return res.json();
        })
        .then((json) => {
          console.log("New Person added: ", json);
          console.log("New Person ID: ", json.id);
          setCharacters([...characters, json]);
          if (json.id === undefined){
            throw new Error("Failed to create user id");
          }
        })
        .catch((error) => {
          console.log(error);
        })
    }

    //html for webpage: 
        //table for character display (props pass characters and enable removal)
        //form for new character submission  
    return (
      <div className='container'>
        <Table 
            characterData={characters} 
            removeCharacter={removeOneCharacter}
        />
        <Form handleSubmit={addUser}/>
      </div>
    );
  }
export default MyApp;