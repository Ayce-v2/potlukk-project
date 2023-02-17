import { useReducer } from "react"
import { Event } from "ws"
import { dishesQuery } from "../api/dishes-request"
import { dishReducer } from "../reducers/host-dishes-reducer"
import { initialState } from "../reducers/host-dishes-reducer"

export type Props = {
    potlukkId: number
}

// type Dish = {
//     name: string
//     description: string
//     broughtBy: number
//     serves: number
//     allergens: string[]
// }


export function PotlukkDetailsHostPage(props:Props) {

    const [dishState, dispatch] = useReducer(dishReducer, initialState)

    async function submitForm(){
        // dispatch({type:"ADD_DISH"})
        // const newDish = await dishesQuery({
        //     potlukkId:props.potlukkId,
        //     dishes:dishState.dishes
            
        // })
    }

    function allergenInput(e:any) {

        dispatch({type:"SET_ALLERGENS", payload:{checked: e.target.checked, allergy: e.target.value}})
        
    }



    return <>
    <div>
    
    <h3>Dishes</h3>
    
    <label htmlFor="">Name of Dish</label>
    <input id="name" type="text" placeholder="name of dish" onChange={e => dispatch({type:"SET_NAME", payload:e.target.value})}/>

    <label htmlFor="">Description</label>
    <input id="desc" type="text" placeholder="description of dish" onChange={e => dispatch({type:"SET_DESC", payload:e.target.value})}/>

    <label htmlFor="">Brought By</label>
    <input id="broughtBy" type="text" placeholder="Account ID Number" onChange={e => dispatch({type:"SET_BROUGHT_BY", payload:Number(e.target.value)})}/>

    <label htmlFor="serves">Serving Size</label>
    <input id="serves" type="text" placeholder="Number of people dish serves" onChange={e => dispatch({type:"SET_SERVING_SIZE", payload:Number(e.target.value)})}/>

    
    <label htmlFor="milk">Milk:</label>
    <input id="milk" type = "checkbox" value = "MILK" onChange = {e => allergenInput(e)}/>

    <label htmlFor="soy">Soy:</label>
    <input id="soy" type = "checkbox" value = "SOY" onChange = {e => allergenInput(e)}/>

    <label htmlFor="tree">Tree Nut:</label>
    <input id="tree" type = "checkbox" value = "TREE_NUT" onChange = {e => allergenInput(e)}/>
    

    <button onClick={e => dispatch({type:"ADD_DISH"})}>Add Dish</button>

    </div>
    </>
}