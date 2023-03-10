import { useReducer } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { createNewUser } from "../api/registration-requests"
import { AppAction } from "../reducers/app-reducer"
import { verificationReducer } from "../reducers/registration-reducer"
import { initialState } from "../reducers/registration-reducer"

export function RegistrationPage(){

    const headingStyles = {
        color: 'blue',
        marginBottom: '0.5rem',
      };
    
      const labelStyles = {
        display: 'block',
        fontSize: '1.2rem',
        fontWeight: 'bold',
        marginBottom: '0.3rem',
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
        color: 'black',
        padding: '1rem',
        border: 'none',
        borderRadius: '0px',
        cursor: 'pointer',
      };
    
    
      const formStyles = {
        display: 'flex',
        flexDirection: 'column' as const,
        maxWidth: '350px',
        margin: '0 auto',
        height: '490px',
        border: '1px solid gray',
        padding: '1rem',
        borderRadius: '5px',
        backgroundColor: 'lightgrey'
      };

    
    const navigate = useNavigate()
    const [verificationState, dispatch] = useReducer(verificationReducer, initialState)
    const reduxDispatch = useDispatch()<AppAction>
    const route = useNavigate()
    
    
    async function submitData() {

      
        
        if(verificationState.isValid){
          route("/")
          const lukker = await createNewUser({
            username:verificationState.username,
            password:verificationState.password,
            fname:verificationState.fname,
            lname:verificationState.lname,
            allergies:verificationState.allergies
        })
        window.alert(`Success! New user was created, ID is ${lukker.userId} !! Please login to continue`)

        
        
        
        reduxDispatch({type:"SET_LUKKER", payload:lukker}); // after creation we send a lukker to the app store and it can be used anywhere
        
    }else{
        alert("Error! Passwords must match, have atleast 10 characters, and 1 special character.")
    }}    
    
    return <>
    <h2 style={headingStyles}> <center>Registration Page</center></h2>
    <form style={formStyles}>
    <label style={labelStyles} htmlFor="username">Username</label>    
    <input style={inputStyles} id="username" type="text" placeholder="JohnDoe23" onChange={e => dispatch({type:"SET_USERNAME", payload:e.target.value})}/>  
    <label style={labelStyles} htmlFor="password">Password</label>
    <input style={inputStyles} id="password" type="password" placeholder="******" onChange={e => dispatch({type:"SET_PASSWORD", payload:e.target.value})}/>
    <label style={labelStyles} htmlFor="confirm">Confirm Password</label>
    <input style={inputStyles} id="confirm" type="password" placeholder="******" onChange={e => dispatch({type:"VERIFY_PASSWORD", payload:e.target.value})}/>
    <label style={labelStyles} htmlFor="confirm">First Name</label>
    <input style={inputStyles} id="confirm" type="text"  onChange={e => dispatch({type:"SET_FIRSTNAME", payload:e.target.value})}/>
    <label style={labelStyles} htmlFor="confirm">Last Name</label>
    <input style={inputStyles} id="confirm" type="text" onChange={e => dispatch({type:"SET_LASTNAME", payload:e.target.value})}/>

   

    <div id="allergens" style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
        <h4 style={headingStyles}>Select Allergens:</h4>

        <label style={labelStyles} htmlFor="allergy">Tree Nuts</label>
        <input style={inputStyles} id="allergy" type="checkbox" onChange={e =>dispatch({type:"SET_ALLERGEN", payload:"TREE_NUT"})}/>
        
        <label style={labelStyles} htmlFor="allergy2">Soy</label>
        <input style={inputStyles} id="allergy2" type="checkbox"  onChange={e =>dispatch({type:"SET_ALLERGEN", payload:"SOY"})}/>
        <label style={labelStyles} htmlFor="allergy3">Milk</label>
        <input style={inputStyles} id="allergy3" type="checkbox"   onChange={e =>dispatch({type:"SET_ALLERGEN", payload:"MILK"})}/>

    </div>

    <button style={buttonStyles} onClick={submitData}>Sign Up!</button>

    </form>

    
    </>
}

