import { useReducer } from "react"
import { useParams } from "react-router-dom"
import { Event } from "ws"
import { dishesQuery } from "../api/dishes-request"
import { dishReducer } from "../reducers/host-dishes-reducer"
import { initialState } from "../reducers/host-dishes-reducer"

// export type Props = {
//     potlukkId: number
// }
//props:Props as an argument in function

export function PotlukkDetailsHostPage() {

    // const {idOfPotlukk} = useParams();
    // console.log(idOfPotlukk) //


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


    const [dishState, dispatch] = useReducer(dishReducer, initialState)

    function allergenInput(e:any) {
        console.log(e.target.value)
        console.log(e.target.checked)

        dispatch({type:"SET_ALLERGENS", payload:{checked: e.target.checked, allergy: e.target.value}})
        
    }



    return <>
    <form style={formStyles}>
    <div>
    
    <h2 style={headingStyles}>Dishes</h2>
    
    <label style={labelStyles} htmlFor="">Name of Dish</label>
    <input style={inputStyles} id="name" type="text" placeholder="Name of dish" onChange={e => dispatch({type:"SET_NAME", payload:e.target.value})}/>
    <br></br>
    <label style={labelStyles} htmlFor="">Description</label>
    <input style={inputStyles} id="desc" type="text" placeholder="Description of dish" onChange={e => dispatch({type:"SET_DESC", payload:e.target.value})}/>
    <br></br>
    <label style={labelStyles} htmlFor="">Brought By</label>
    <input style={inputStyles} id="broughtBy" type="text" placeholder="Account ID number" onChange={e => dispatch({type:"SET_BROUGHT_BY", payload:Number(e.target.value)})}/>
    <br></br>
    <label style={labelStyles} htmlFor="serves">Serving Size</label>
    <input style={inputStyles} id="serves" type="text" placeholder="# of people dish serves" onChange={e => dispatch({type:"SET_SERVING_SIZE", payload:Number(e.target.value)})}/>
    <br></br>
    
    <h3>Any Allergens?</h3>
    <label style={labelStyles} htmlFor="milk">Milk:</label>
    <input style={inputStyles} id="milk" type = "checkbox" value = "MILK" onChange = {e => allergenInput(e)}/>
    <br></br>
    <label style={labelStyles} htmlFor="soy">Soy:</label>
    <input style={inputStyles} id="soy" type = "checkbox" value = "SOY" onChange = {e => allergenInput(e)}/>
    <br></br>
    <label style={labelStyles} htmlFor="tree">Tree Nut:</label>
    <input style={inputStyles} id="tree" type = "checkbox" value = "TREE_NUT" onChange = {e => allergenInput(e)}/>
    <br></br>

    <button style={buttonStyles} onClick={e => dispatch({type:"ADD_DISH"})}>Add Dish</button>

    </div>
    </form>
    </>
}