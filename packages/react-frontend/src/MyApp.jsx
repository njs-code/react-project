import Table from './Table';
import Form from "./Form";
import React, {useState, useEffect} from 'react';
 
function MyApp(){
    //defines characters list as state
    const [characters, setCharacters] = useState([]);

    //return a promise of users from backend
    function fetchUsers() {
      const promise = fetch("http://localhost:8000/users");
      return promise;
    }

    //
    useEffect(() => {
      fetchUsers()
        .then((res)=> res.json())
        .then((json) => setCharacters(json["users_list"]))
        .catch((error) => {console.log(error);})
    }, []);

    //function to filter/remove a character from the state
    function removeOneCharacter(index) {
        const updated = characters.filter((character, i) => {
          return i !== index;
        });
        setCharacters(updated);
      };

    //function to add a character to the state
    function updateList(person){
        setCharacters([...characters, person]);
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
        <Form handleSubmit={updateList}/>
      </div>
    );
  }
export default MyApp;