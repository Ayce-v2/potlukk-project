

export type Dish = {
    name: string
    description: string
    broughtBy: number
    serves: number
    allergens: string[]
}

export type DishState = {
    dishName: string 
    desc:string
    broughtById: number
    dishServes: number
    allergens: string[]
    dishes: Dish[]
}

export type Allergen = {
    allergy: string
    checked: boolean
}


export const initialState:DishState = {
    dishName: "",
    desc: "",
    broughtById: 0,
    dishServes: 0,
    allergens: [],
    dishes: []
}


export type AddDishAction = {type:"ADD_DISH"}
export type SetNameAction = {type:"SET_NAME", payload:string}
export type SetDescriptionAction = {type:"SET_DESC", payload:string}
export type SetBroughtByAction = {type:"SET_BROUGHT_BY", payload:number}
export type SetServingSizeAction = {type:"SET_SERVING_SIZE", payload:number}
export type SetAllergensAction = {type:"SET_ALLERGENS", payload:Allergen}
export type SetDishesAction = {type:"SET_DISHES", payload:Dish[]} //takes in an array of dishes and updates the state

//sagas actions
// export type CreateDishFromFormAction = {type:"CREATE_DISH_FROM_FORM", payload:Dish}
// export type PopulateDishesAction = {type:"POPULATE_DISHES", payload:number}
// export type UpdateDishesAction = {type:"UPDATE_DISHES", payload:number}

export type DishAction = AddDishAction | SetNameAction | SetDescriptionAction | SetBroughtByAction |
                         SetServingSizeAction | SetAllergensAction | SetDishesAction

export function dishReducer(state:DishState = initialState, action:DishAction):DishState{
    const nextState:DishState = JSON.parse(JSON.stringify(state));

    switch(action.type) {
        case "ADD_DISH": {
            nextState.dishes.push({
                name: nextState.dishName,
                description: nextState.desc,
                broughtBy: nextState.broughtById,
                serves: nextState.dishServes,
                allergens: nextState.allergens
            })
            // add alert if successful 
                return nextState;
        }

        case "SET_NAME": {
            nextState.dishName = action.payload
            return nextState;

        }

        case "SET_DESC": {
            nextState.desc = action.payload
            return nextState;
            
        }

        case "SET_BROUGHT_BY": {
            nextState.broughtById = action.payload
            return nextState;
            
        }

        case "SET_SERVING_SIZE": {
            nextState.dishServes = action.payload
            return nextState;
            
        }

        case "SET_ALLERGENS": {
            if(action.payload.checked) {
                nextState.allergens.push(action.payload.allergy)

            }
            else {
                nextState.allergens = nextState.allergens.filter(a => a !== action.payload.allergy);
                
            }
            return nextState;
            
        }

        case "SET_DISHES": {
            nextState.dishes = action.payload
            return nextState;
        }

        default: return nextState;
    }
}