import React, { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { LukkerUserState, PotlukkActions } from '../reducers/potlukk-reducer';


type Styles = {
  [key: string]: string | number | undefined;
  flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
}

export type SignInForm = {
  username: string
  password: string
}

export function SignInpage() {

  const [form, setForm] = useState<SignInForm>({username:"",password:""});
  const userState = useSelector((store:LukkerUserState) => store);
    const dispatch = useDispatch()<PotlukkActions>;
    const router = useNavigate()
  
    function signIn(){
      console.log("Sign in function called");
        dispatch({type:"SIGN_IN_USER",payload:form})
        setTimeout(() => {
          if((!localStorage.getItem("userid"))){
            //if(((userState.error)) ){
              alert("Please login or signup to access home page")
              console.log("Login failed");
              //  router("/")
           } else{
             // alert(currentUserState.fname)
               router("/home")
           }  
        }, 100)
        //alert("value for the user is" + (userState.currentUser.userId))
        
    
        
    }

    
  
  //const [authvalue, setauthvalue] = useState('false');
  
  //const navigate = useNavigate(); 
  //localStorage.setItem("userauthentication",  authvalue)

  const headingStyles = {
    color: 'blue',
    marginBottom: '2rem',
  }

  const labelStyles = {
    display: 'block',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
  }

  const inputStyles = {
    fontSize: '1rem',
    padding: '0.5rem',
    borderRadius: '5px',
    border: '1px solid grey',
    marginBottom: '1rem',
  }

  const buttonStyles = {
    backgroundColor: 'green',
    color: 'white',
    padding: '1rem 1rem',
    border: 'none',
    borderRadius: '1px',
    cursor: 'pointer',
  }
    const formStyles = {
    display: 'flex',
    flexDirection: 'column' as const,
    maxWidth: '250px',
    margin: '0 auto',
    border: '1px solid gray',
    padding: '1rem',
    borderRadius: '5px',
    backgroundColor: 'lightgrey'
  }

  // async function handleSubmit_notused(event: FormEvent<HTMLButtonElement>) {
  //     event.preventDefault();
    
  //     const response = await verifyUser(form);

  //     if (localStorage.getItem("userauthentication")==="true"){
  //       gotohomepage();
  //     }else{
  //       alert("Please enter valid user")
  //     }    

  //  } 
  
  //  function gotohomepage(){
  //   navigate('/'); 
  //  }

 
  return (
    <>
      <h1 style={headingStyles}> <center> Sign in Page</center></h1>
      <div style={formStyles}>
       <div> <label  style={labelStyles}>Username:</label>
        <input style={inputStyles}
         id="userName" type="text" onChange={(e)=>setForm({...form, username:e.target.value})}/>
        </div>
        <div>
        <label style={labelStyles}>Password:</label>
        <input style={inputStyles}
        id="password" type="password" onChange={(e)=>setForm({...form, password:e.target.value})}/>
        </div>
        <button onClick={signIn} style={buttonStyles}>Sign In</button>
        <div>
        <hr style={{border: 'none', borderTop: '1px solid #000', margin: '10px 0'}} />
        <label htmlFor="newUser" style={labelStyles}>NewUser</label>
        </div>
        <button id="SignUP" onClick={() => router("/registration")} style={buttonStyles}> Sign Up </button>
      </div>
    </>
  );
}
