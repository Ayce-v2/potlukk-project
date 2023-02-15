import React, { FormEvent, useState } from 'react';
import { verifyUser } from '../api/signin-page';
import { useNavigate } from 'react-router-dom';

type Styles = {
  [key: string]: string | number | undefined;
  flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
}

export function SignInPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 
  localStorage.setItem("userauthentication", "false")

 

  const headingStyles = {
    color: 'blue',
    marginBottom: '2rem',
  };

  const labelStyles = {
    display: 'block',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
  };

  const inputStyles = {
    fontSize: '1rem',
    padding: '0.5rem',
    borderRadius: '5px',
    border: '1px solid grey',
    marginBottom: '1rem',
  };

  const buttonStyles = {
    backgroundColor: 'green',
    color: 'white',
    padding: '1rem 1rem',
    border: 'none',
    borderRadius: '1px',
    cursor: 'pointer',
  };


  const formStyles = {
    display: 'flex',
    flexDirection: 'column' as const,
    maxWidth: '300px',
    margin: '0 auto',
    border: '1px solid gray',
    padding: '1rem',
    borderRadius: '5px',
    backgroundColor: 'lightgrey'
  };

  async function handleSubmit(event: FormEvent<HTMLButtonElement>) {
      event.preventDefault();
    
      const response = await verifyUser(username, password);

      if (localStorage.getItem("userauthentication")==="true"){
        gotohomepage();
      }else{
        alert("Please enter valid user")
      }    

   } 
  
   function gotohomepage(){
    navigate('/'); 
   }

  function gotoregisterpage(){
    navigate('/registration'); 
  }

  return (
    <>
      <h1 style={headingStyles}> <center> Sign in Page</center></h1>
      <form style={formStyles}>
       <div> <label  style={labelStyles}>Username:</label>
        <input style={inputStyles}
          type="text" 
          id="username" 
          value={username} 
          onChange={(event) => setUsername(event.target.value)} 
        />
        </div>
        <div>
        <label style={labelStyles}>Password:</label>
        <input style={inputStyles}
          type="password" 
          id="password" 
          value={password} 
          onChange={(event) => setPassword(event.target.value)} 
          
        />
        </div>
        <button type="submit" onClick={handleSubmit} style={buttonStyles}>Sign In</button>
        <div>
        <label htmlFor="newUser" style={labelStyles}>NewUser</label>
        
      
        </div>
        <button id="SignUP" onClick={gotoregisterpage} style={buttonStyles}> Sign Up </button>
      </form>
    </>
  );
}
