import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';

function App() {
  const [form, setForm] = useState({})
  const [users, setUsers] = useState([])

  const handleform = (e) => {

    console.log(e.target.value, e.target.name);
    setForm({
      ...form,    
      [e.target.name]: e.target.value
    })


  }
  const handleSubmit= async (e)=>{
    e.preventDefault();
    const response=await fetch('http://localhost:8080/demo',{
      method:'POST',
      body:JSON.stringify(form),
      headers:{
        'content-Type':'application/json'
      }
    })
    const data=await response.json();

    console.log(data);


  }
  const getUsers= async()=>{
    const response=await fetch('http://localhost:8080/demo',{
      method:'GET',
    })
    const data=await response.json();

    setUsers(data); 
  }
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <p >{JSON.stringify(form)}</p>
        <span>Username</span>
        <input type="text" name='username' onChange={handleform}></input>
        <span>Password</span>
        <input type="text" name='password' onChange={handleform}></input>
        <input type="submit"></input>

      </form>
      <div>
        <ul>
          {users.map(user=> <li key={user._id}>{user.username},{user.password}</li>)}
        </ul>
      </div>

    </div>
  );
}

export default App;
