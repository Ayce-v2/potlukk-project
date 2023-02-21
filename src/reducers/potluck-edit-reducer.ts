
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

export type EditTitle = {type: "EDIT_TITLE", payload:string}
export type EditLocation = {type: "EDIT_LOCATION", payload:string}
export type CancelledAction = {type:"CANCELLED_ACTION", payload:"CANCELLED"}
export type EditDescription = {type: "EDIT_DESCRIPTION", payload: string}
export type EditIsPublic = {type: "EDIT_IS_PUBLIC", payload: boolean}
export type EditTime = {type: "EDIT_TIME", payload: number}
export type AddTag = {type: "ADD_TAG", payload: string}
export type DeleteTag = {type: "DELETE_TAG", payload: string}


export type PotlukkEditInputFormActions =  EditTitle| EditLocation | CancelledAction |EditDescription
 |EditIsPublic |  EditTime| AddTag| DeleteTag

export function PotlukkEditFormReducer(state: PotlukkEditInputState, action: PotlukkEditInputFormActions):PotlukkEditInputState{

    const nextState: PotlukkEditInputState = JSON.parse(JSON.stringify(state));
    switch(action.type){
        case "EDIT_TITLE":{
            nextState.title = action.payload;
            return nextState
        }
        case "EDIT_LOCATION":{
            nextState.location = action.payload;
            return nextState
        }
        case "CANCELLED_ACTION":{
            nextState.status = action.payload;
            return nextState
        }
        case "EDIT_DESCRIPTION":{
            nextState.description = action.payload;
            return nextState
        }
        case "EDIT_IS_PUBLIC":{
            nextState.isPublic = action.payload;
            return nextState
        }
        case "EDIT_TIME":{
            nextState.time = action.payload;
            return nextState
        }
        case "ADD_TAG":{
            nextState.tags.push(action.payload);
            return nextState
        }

       
        default:{
            return nextState
        }
        
    }
}