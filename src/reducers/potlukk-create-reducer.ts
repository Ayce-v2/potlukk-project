
export type PotlukkCreationInputState = {    
    //createPotlukk: any
    details:{
        title: string,
        location: string,
        // scheduled: boolean,
        // cancelled: boolean,
        status: string,
        description: string,
        isPublic: Boolean,
        time: number,
        tags: string[]
        
    }
    hostId: number
    
}
export type PotlukkEditInputState = {
    potlukkId: number,
    title: string,
    location: string,
    status: string,
    description: string,
    isPublic: Boolean,
    time: number,
    tags: string[]
    
}


export type SetTitle = {type: "SET_TITLE", payload:string}
export type SetLocation = {type: "SET_LOCATION", payload:string}
export type ScheduledAction = {type:"SCHEDULED_ACTION", payload:"SCHEDULED"}
export type CancelledAction = {type:"CANCELLED_ACTION", payload:"CANCELLED"}
export type SetDescription = {type: "SET_DESCRIPTION", payload: string}
export type IsPublic = {type: "IS_PUBLIC", payload: boolean}
export type SetTime = {type: "SET_TIME", payload: number}
export type AddTag = {type: "ADD_TAG", payload: string}


export type PotlukkInputFormActions = SetTitle | SetLocation | ScheduledAction |
CancelledAction| SetDescription | IsPublic | SetTime | AddTag 

export function PotlukkCreateReducer(state: PotlukkCreationInputState, action: PotlukkInputFormActions):PotlukkCreationInputState{

    const nextState: PotlukkCreationInputState = JSON.parse(JSON.stringify(state));
    switch(action.type){
        case "SET_TITLE":{
            nextState.details.title = action.payload;
            return nextState
        }
        case "SET_LOCATION":{
            nextState.details.location = action.payload;
            return nextState
        }
        case "SCHEDULED_ACTION":{
            nextState.details.status = action.payload;
            return nextState
        }
        case "CANCELLED_ACTION":{
            nextState.details.status = action.payload;
            return nextState
        }
        case "SET_DESCRIPTION":{
            nextState.details.description = action.payload;
            return nextState
        }
        case "IS_PUBLIC":{
            nextState.details.isPublic = action.payload;
            return nextState
        }
        case "SET_TIME":{
            nextState.details.time = action.payload;
           // alert("error is because" + action.payload)
            return nextState
        }
        case "ADD_TAG":{
            nextState.details.tags.push(action.payload);
            return nextState
        }
        
        default:{
            return nextState
        }
        
    }
}