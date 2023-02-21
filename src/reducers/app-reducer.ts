import { Lukker } from "../api/registration-requests"




export type AppState = {
    signedInLukker?: Lukker
}

export type SetLukkerAction = {type:"SET_LUKKER", payload:Lukker};

export type AppAction = SetLukkerAction

const initialState: AppState ={

}

export default function appStateReducer(state: AppState = initialState, action:AppAction): AppState{
    const nextState: AppState = JSON.parse(JSON.stringify(state));

    switch(action.type){

        case "SET_LUKKER":{
            nextState.signedInLukker = action.payload
            return nextState;
        }

        default:{
            return nextState
        }

    }

}