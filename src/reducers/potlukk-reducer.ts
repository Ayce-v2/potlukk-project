
import { SignInForm } from "../pages/sign-in-page";
import { PotlukkEditInputState } from "./potluck-edit-reducer";
import { PotlukkCreationInputState } from "./potlukk-create-reducer"


export enum PotlukkStatus {
    SCHEDULED,
    CANCELLE,
    CANCELLED
}
export enum Allergen {
    MILK,
    EGG,
    FISH,
    SHELLFISH,
    SOY,
    WHEAT,
    TREE_NUT
}
export type Dishes = {
    name: string,
    description: string,
    broughtBy: number,
    serves: number,
    allergens: Allergen
}



export enum InvitationStatus {
    ACCEPTED,
    MAYBE,
    DECLINED,
    PENDING
}
export type Invitation = {
    status: InvitationStatus,
    potlukker: LukkerUserInfo,
}
export type InvitationSendInput = {
    potlukkId: number,
    potlukkerId: number
}



export type Error = {
    detail: Detail[];
}

export type Detail = {
    loc:  Array<number | string>;
    msg:  string;
    type: string;
}



export type LukkerUserInfo = {
    userId:    number;
    username:  string;
    fname:     string;
    lname:     string;
    allergies: string[];
}


export type CreateUserForm = {
    username:  string;
    password:  string;
    fname:     string;
    lname:     string;
    allergies: string[];
}


export type LukkerUserState = {
    //currentPotluck: any;
    currentUser: LukkerUserInfo
    currentPotluck: Potlukk
    userList: LukkerUserInfo[]

    error: boolean
    newUserAdded: boolean

    potlukkList: Potlukk[]
    invited: LukkerUserInfo[]
    filteredPotlukkList: Potlukk[]
    dishes: Dishes[]
    addedNotification: PotlukkNotification
    filteredNotificationList: PotlukkNotification[]
}


export type PotlukkDetails = {
    title: string
    location: string
    status: PotlukkStatus
    description: string
    isPublic: boolean
    time: number
    tags: string[]
  }


// export type Potlukk = {
//     createPotlukk: any;
//     potlukkId: any;
//     details: PotlukkCreationInputState,
//     host: LukkerUserInfo,
//     invitations: Invitation[],
//     dishes: Dishes,
//     hostId:number
// }

export type Potlukk = {
    potlukkId: number,
    details: PotlukkDetails,
    host: LukkerUserInfo,
    invitations: Invitation[],
    dishes: Dishes[]
}

export type PotlukkNotification ={
    eventId: number
    timestamp: number
    kind: NotificationKind
    description: string
    affectedPotlukkId: number
    createdByUser: number
}
  
export type PotlukkNotificationInput ={
    kind: string
    description: string
    affectedPotlukkId: number
    createdByUser: number
}

export enum NotificationKind {
    DISH_ADDED,
    DISH_REMOVED,
    POTLUKK_ALTERED,
    POTLUKK_CANCELED,
    INVITE_ACCEPTED,
    INVITE_DECLINE,
    INVITE_SENT
  }



//Reducer Actions 

export type AddUser = {type:"ADD_USER", payload:LukkerUserInfo}
export type SetErrorAction = {type:"SET_ERROR_ACTION", payload:boolean}
export type ClearErrorAction = {type:"CLEAR_ERROR_ACTION"}
export type SetUser = {type:"SET_USER", payload:LukkerUserInfo}
export type ClearUser = {type:"CLEAR_USER"};
export type GetUsersAction = {type:"GET_USERS_ACTION", payload: LukkerUserInfo[]}
export type InviteUserAction = {type: "INVITE_USER_ACTION", payload: string}
export type DeleteInviteAction = {type: "DELETE_INVITE_ACTION", payload: string}
export type GetUserNameAction = {type:"GET_USER_NAME_ACTION", payload: string}
export type AddPotlukk = {type:"ADD_POTLUKK", payload: Potlukk}
export type ClearInviteAction = {type:"CLEAR_INVITE_ACTION"}
export type GetPotlukkDetails = {type:"GET_POTLUKK_DETAILS",payload:Potlukk[]}
export type DeleteInvitedAction = {type: "DELETE_INVITED_ACTION", payload: string}
export type SetNotificationAction = {type:"SET_NOTIFICATION",payload:PotlukkNotification}
export type SetNotificationList = {type:"SET_NOTIFICATION_LIST",payload:PotlukkNotification[]}
export type SetCurrentPotlukk = {type: "SET_CURRENT_POTLUKK", payload: Potlukk}



//Saga Actions
export type SignInUser = {type:"SIGN_IN_USER", payload:SignInForm}
export type RequestGetUsersAction = {type:"REQUEST_GET_USERS", payload: string}
export type RequestUserIdAction = {type: "REQUEST_USER_ID_ACTION", payload: string}
export type RequestCreatePotlukk = {type: "REQUEST_CREATE_POTLUKK", payload: PotlukkCreationInputState}
export type RequestEditPotlukk = {type: "REQUEST_EDIT_POTLUKK", payload: PotlukkEditInputState}
export type RequestPotlukkDetailsAction = {type:"REQUEST_POTLUKK_DETAILS"}
export type RequestCancelPotlukk = {type: "REQUEST_CANCEL_POTLUKK", payload: PotlukkEditInputState}
export type RequestCreateNotification = {type:"REQUEST_CREATE_NOTIFICATION",payload:PotlukkNotificationInput}

export type RequestGetPotlukkById = {type: "REQUEST_GET_POTLUKK_BY_ID", payload:number}


// Action types
export type PotlukkActions = AddUser| SetErrorAction| ClearErrorAction | SetUser|SetCurrentPotlukk|
ClearUser|GetUsersAction|InviteUserAction | DeleteInviteAction|GetUserNameAction |AddPotlukk|DeleteInvitedAction|ClearInviteAction
|SignInUser| ClearUser|GetPotlukkDetails|RequestGetUsersAction|RequestGetPotlukkById|RequestUserIdAction|RequestCreatePotlukk| RequestCancelPotlukk|RequestPotlukkDetailsAction|RequestEditPotlukk



export type PotlukkInfo = {
    id: number;
    name: string;
    date: string;
    location: string;
    organizer: string;
    participants: string[];
  }


const initialState: LukkerUserState = {
    currentUser: {
        userId: 0,

        username:  '',
        fname:     '',
        lname:     '',
        allergies: []
    },
    currentPotluck: {
        potlukkId: 123,
        details:{
          title: "",
          location: "",
          status: PotlukkStatus.CANCELLED,
          description: "",
          isPublic: false,
          time: 0,
          tags: [
            "this is a test"
          ]
        },
        host: {
          userId: 0,
          username: "",
          fname: "John",
          lname: "Smith",
          allergies: [
          ]
        },
        invitations: [],
        dishes: []
      },
    userList:[],
    error:false,
    newUserAdded:false,
    potlukkList: [],
    invited: [],
    filteredPotlukkList: [],
    dishes: [],

    addedNotification: {
        affectedPotlukkId:0,
        createdByUser:0,
        description:"",
        kind:NotificationKind.INVITE_SENT,
        eventId:0,
        timestamp:0
    },
    filteredNotificationList:[]
    }


let invitedUsers = JSON.parse(localStorage.getItem("InvitedUsers") || "[]");


localStorage.setItem("InvitedUsers", JSON.stringify([]));


// export const getItemFromLocalStorage = (key: string): string | null => {
//     return window.localStorage.getItem(key);
//   }
  
//   export const setItemInLocalStorage = (key: string, value: string): void => {
//     window.localStorage.setItem(key, value);
//   }

export function lukkerUserReducer(state: LukkerUserState = initialState, action: PotlukkActions):LukkerUserState{
    const nextState: LukkerUserState = JSON.parse(JSON.stringify(state));
    

    switch(action.type){

        case "GET_POTLUKK_DETAILS": {
        
            localStorage.setItem("pottulukks",JSON.stringify(action.payload))
             return nextState
         }
        case "ADD_USER":{
            nextState.userList.push(action.payload)
            nextState.newUserAdded = true
            nextState.currentUser = action.payload
            return nextState
        }
        case "ADD_POTLUKK": {
            
              nextState.potlukkList.push(action.payload)
              return nextState   
        }

        case "SET_CURRENT_POTLUKK":{
            nextState.currentPotluck = action.payload
            //console.log("from reducer"+action.payload.potlukkId)
            return nextState
        }
        
        case "GET_USERS_ACTION": {
            nextState.userList = action.payload
            localStorage.setItem("AllUsers",JSON.stringify(action.payload))
            return nextState
        }
        case "SET_ERROR_ACTION":{
            localStorage.clear();
            nextState.error = action.payload
            return nextState
        }
        case "CLEAR_ERROR_ACTION":{
            nextState.error = false;
            return nextState
        }
        case "CLEAR_USER": {
            localStorage.clear();
            nextState.currentUser.userId = 0;
            return nextState;
        }
        
        case "SET_USER":{
            console.log(action.payload);
            nextState.currentUser = action.payload
            if(action.payload.userId===0){
                // localStorage.removeItem("username")
                // localStorage.removeItem("userid")
                localStorage.clear();
            }else{                
                localStorage.setItem("username",action.payload.username)
                localStorage.setItem("userid",action.payload.userId.toString())
            }            
            return nextState
            
        }
        case "INVITE_USER_ACTION":{
            let users: LukkerUserInfo[] = nextState.userList.filter((item)=>item.userId === Number(action.payload));

                
            // if (!invitedUsers.includes(users)) {
            //     // Add the value to the array
            //     invitedUsers.push(users);

            //     // Convert the modified array back into a string
            //     let updatedArrayString = JSON.stringify(invitedUsers);
            //     // Store the updated string in localStorage
            //     localStorage.setItem("InvitedUsers", updatedArrayString);
            //   }
            
    
            (!(nextState.invited.some((item) => item.userId === users[0].userId))) &&
            nextState.invited.push(users[0])
                //some method implement
            return nextState
        }
        case "DELETE_INVITE_ACTION":{
            let users: LukkerUserInfo[] = nextState.invited.filter((item)=>item.userId !== Number(action.payload));
            nextState.invited = users
            // // Remove an item from the array by name
            // let nameToRemove = action.payload;
            // invitedUsers = invitedUsers.filter((user: string) => user !== nameToRemove);

            // // Convert the modified array back into a string
            // let updatedArrayString = JSON.stringify(invitedUsers);

            // // Store the updated string in localStorage
            // localStorage.setItem("InvitedUsers", updatedArrayString);
            return nextState
        }
        case "CLEAR_INVITE_ACTION":{
            nextState.invited = []
            return nextState
        }
        default:
            return nextState
    }

    function filterByNotification(note:PotlukkNotification){
        const result = nextState.filteredPotlukkList.some(pt=>pt.potlukkId===note.affectedPotlukkId)
        return result
    }
}
