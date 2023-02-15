

export type NewUser = {
    username: string
    password: string
    fname: string,
    lname: string,
    allergies:string []
    isValid: boolean
}

export const initialState:NewUser = {
    username: "",
    password: "",
    fname: "",
    lname: "",
    allergies: [],
    isValid: false
}

export type SetPasswordAction = {type: "SET_PASSWORD", payload:string}
export type PasswordVerificationAction = {type:"VERIFY_PASSWORD", payload:string}
export type SetUsernameAction = {type:"SET_USERNAME", payload:string}
export type SetAllergenAction = {type:"SET_ALLERGEN", payload:string}
export type VerificationActions = SetPasswordAction | PasswordVerificationAction | SetUsernameAction | SetAllergenAction
                                  
const defaultState:NewUser = {
    allergies: [],
    username: "",
    password: "",
    fname: "",
    lname: "",
    isValid: false
};

export function verificationReducer(state: NewUser = defaultState, action: VerificationActions):NewUser {
    const nextState: NewUser = JSON.parse(JSON.stringify(state));

    

    switch(action.type) {
        case "SET_PASSWORD":

            nextState.password = action.payload;
            return nextState;

        case "VERIFY_PASSWORD": {
            
            nextState.isValid = true; 

            if(nextState.password.length < 10) {
                nextState.isValid = false;
            }

            
            if(!["!","@","#","$"].some(c => nextState.password.includes(c))){ 
                nextState.isValid = false;
            }

            if(nextState.password !== action.payload) {
                nextState.isValid = false;  
            }
              
              return nextState;
        }

        case "SET_USERNAME": {

            nextState.username = action.payload;
            return nextState;
        }

        case "SET_ALLERGEN": {

           if(! nextState.allergies.includes(action.payload)) {
            nextState.allergies.push(action.payload)
           }
           return nextState;
        }

        default: return nextState;
    }
}