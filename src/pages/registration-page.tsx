import { useReducer } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { createNewUser } from "../api/registration-requests"
import { AppAction } from "../reducers/app-reducer"
import { verificationReducer } from "../reducers/registration-reducer"
import { initialState } from "../reducers/registration-reducer"


export function RegistrationPage(){

    
    const navigate = useNavigate()
    const [verificationState, dispatch] = useReducer(verificationReducer, initialState)
    const reduxDispatch = useDispatch()<AppAction>
    
    async function submitData() {
        
        if(verificationState.isValid){

        const lukker = await createNewUser({
            username:verificationState.username,
            password:verificationState.password,
            fname:verificationState.fname,
            lname:verificationState.lname,
            allergies:verificationState.allergies
        })
        alert(`Success! New user was created, ID is ${lukker.userId}`)
        reduxDispatch({type:"SET_LUKKER", payload:lukker}); // after creation we send a lukker to the app store and it can be used anywhere
        navigate("/")
    }else{
        alert("Error! Passwords must match, have atleast 10 characters, and 1 special character.")
    }}

    
    
    return <>
    <h1>Registration Page</h1>

    <label htmlFor="username">Username</label>
    <br></br>
    <input id="username" type="text" placeholder="JohnDoe23" onChange={e => dispatch({type:"SET_USERNAME", payload:e.target.value})}/>

    <br></br>

    <label htmlFor="password">Password</label>
    <br></br>
    <input id="password" type="text" placeholder="******" onChange={e => dispatch({type:"SET_PASSWORD", payload:e.target.value})}/>

    <br></br>

    <label htmlFor="confirm">Confirm Password</label>
    <br></br>
    <input id="confirm" type="text" placeholder="******" onChange={e => dispatch({type:"VERIFY_PASSWORD", payload:e.target.value})}/>

   

    <div id="allergens">
        <h3>Select Allergens:</h3>

        <label htmlFor="allergy">Tree Nuts</label>
        <input id="allergy" type="checkbox" onChange={e =>dispatch({type:"SET_ALLERGEN", payload:"TREE_NUT"})}/>
        
        <br></br>

        <label htmlFor="allergy2">Soy</label>
        <input id="allergy2" type="checkbox"  onChange={e =>dispatch({type:"SET_ALLERGEN", payload:"SOY"})}/>

        <br></br>

        <label htmlFor="allergy3">Milk</label>
        <input id="allergy3" type="checkbox"   onChange={e =>dispatch({type:"SET_ALLERGEN", payload:"MILK"})}/>

    </div>

    <br></br>
    <button onClick={submitData}>Sign Up!</button>

    
    </>
}

