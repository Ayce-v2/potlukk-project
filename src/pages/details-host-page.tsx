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
    // console.log(idOfPotlukk)

    const [dishState, dispatch] = useReducer(dishReducer, initialState)

    function allergenInput(e:any) {
        console.log(e.target.value)
        console.log(e.target.checked)

        dispatch({type:"SET_ALLERGENS", payload:{checked: e.target.checked, allergy: e.target.value}})
        
    }



    return <>
    <div>
    
    <h3>Dishes</h3>
    
    <label htmlFor="">Name of Dish</label>
    <input id="name" type="text" placeholder="Name of dish" onChange={e => dispatch({type:"SET_NAME", payload:e.target.value})}/>
    <br></br>
    <label htmlFor="">Description</label>
    <input id="desc" type="text" placeholder="Description of dish" onChange={e => dispatch({type:"SET_DESC", payload:e.target.value})}/>
    <br></br>
    <label htmlFor="">Brought By</label>
    <input id="broughtBy" type="text" placeholder="Account ID number" onChange={e => dispatch({type:"SET_BROUGHT_BY", payload:Number(e.target.value)})}/>
    <br></br>
    <label htmlFor="serves">Serving Size</label>
    <input id="serves" type="text" placeholder="# of people dish serves" onChange={e => dispatch({type:"SET_SERVING_SIZE", payload:Number(e.target.value)})}/>
    <br></br>
    
    <h3>Any Allergens?</h3>
    <label htmlFor="milk">Milk:</label>
    <input id="milk" type = "checkbox" value = "MILK" onChange = {e => allergenInput(e)}/>
    <br></br>
    <label htmlFor="soy">Soy:</label>
    <input id="soy" type = "checkbox" value = "SOY" onChange = {e => allergenInput(e)}/>
    <br></br>
    <label htmlFor="tree">Tree Nut:</label>
    <input id="tree" type = "checkbox" value = "TREE_NUT" onChange = {e => allergenInput(e)}/>
    <br></br>

    <button onClick={e => dispatch({type:"ADD_DISH"})}>Add Dish</button>

    </div>
    </>
}