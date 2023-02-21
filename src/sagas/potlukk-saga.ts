import { takeEvery, put, all, select } from "@redux-saga/core/effects";
import { createPotlukk, editPotlukk, getAllUsers, sendInvite, verifyUser, getPotlukkuserDetails, addNotification} from "../api/requests";
import { LukkerUserInfo, Potlukk, PotlukkNotification, RequestCreatePotlukk, RequestEditPotlukk, RequestGetPotlukkById, RequestGetUsersAction, RequestPotlukkDetailsAction, RequestUserIdAction, SignInUser  } from "../reducers/potlukk-reducer";




//worker sagas


export function* signInUser(action:SignInUser):any{
    try{
        const currentLukker:LukkerUserInfo = yield verifyUser(action.payload);
        console.log(currentLukker);
        
        if(Object.hasOwn(currentLukker, 'detail')){
            yield put({type:"CLEAR_USER"})
        }else{
           
            yield put({type:"SET_USER", payload: currentLukker});
        }
    }catch(e){
        yield put({type:"SET_ERROR_ACTION", payload:true});

    }
}

export function* createPotlukkByForm(action: RequestCreatePotlukk){

    try{
        
        const potlukk: Potlukk  = yield createPotlukk(action.payload);
        const invited: LukkerUserInfo[] = yield select(store => store.invited)

        
        yield put({type:"ADD_POTLUKK",payload: potlukk});
        // yield potlukk.forEach((item)=> alertfn( {
         //alert("potlukk is  --> " +   potlukk.createPotlukk.potlukkId)
        
        yield invited.forEach((item)=>  {

                sendInvite(
                    {
                    potlukkId: potlukk.potlukkId,
                    potlukkerId: item.userId
                })})
                yield put({type:"CLEAR_INVITE_ACTION"});
    }catch(e){
        yield put({type:"SET_ERROR_ACTION", payload: e, error:true
        });
    }
}

export function* getUsers(action: RequestGetUsersAction){
    try{
        const lukkers: LukkerUserInfo[]  = yield getAllUsers();
        yield put({type:"GET_USERS_ACTION",payload: lukkers});
    }catch(e){
        yield put({type:"SET_ERROR_ACTION", payload: e, error:true
        });
    }
}

export function* editPotlukkByForm(action: RequestEditPotlukk){

    try{
        
        const potlukk: Potlukk  = yield editPotlukk(action.payload);
        
    }catch(e){
        yield put({type:"SET-ERROR-ACTION", payload: e, error:true
        });
    }
}

export async function getPotlukkById(form:number):Promise<Potlukk>{

    const query = `query getPoutlukkById($input: Int!){
      potlukks(potlukkId: $input){
        ...on Potlukk{
          potlukkId
          details{
            title
            location
            status
            description
            isPublic
            time
            tags
          }
          host{
            userId
            username
            fname
            lname
            allergies
          }
          invitations{
            status
            potlukker{
              userId
              username
              fname
              lname
              allergies
            }
          }
            dishes{
              name
              description
              broughtBy
              serves
              allergens
            }
          }
      }
    }`
    const variables = {input:form}
    const body = JSON.stringify({query:query,variables:variables})
  
    const httpResponse = await fetch("http://127.0.0.1:8000/graphql", {method:"POST", body, headers:{"Content-Type":"application/json"}});
    const responseBody = await httpResponse.json();
    const potlukk:Potlukk = responseBody.data.potlukks[0];
    return potlukk
  }

export function* getPotlukkDetails(action:RequestPotlukkDetailsAction){
    try{
        const lukkers: Potlukk[]  = yield getPotlukkuserDetails();
        yield put({type:"GET_POTLUKK_DETAILS",payload: lukkers});
        
    }catch(e){
        yield put({type:"ERROR", payload: e, error:true
        });
    }   
}

export function* getPotlukkByIdForm(action: RequestGetPotlukkById){

    try{
        
        const potlukk: Potlukk  = yield getPotlukkById(action.payload);
        yield put({type:"SET_CURRENT_POTLUKK", payload: potlukk});
    }catch(e){
        yield put({type:"ERROR", payload: e, error:true
        });
    }
}

export function* cancelPotlukk(action: RequestEditPotlukk){

    try{
        action.payload.status = "CANCELLED";
        const potlukk: Potlukk  = yield editPotlukk(action.payload);
        const notified:PotlukkNotification = yield addNotification({
            affectedPotlukkId:potlukk.potlukkId,
            createdByUser:potlukk.host.userId,
            description:potlukk.details.description,
            kind: "POTLUKK_CANCELED"
        });
        yield put({type:"SET_NOTIFICATION",payload:notified})
        
    }catch(e){
        yield put({type:"ERROR", payload: e, error:true
        });
    }
}


export function* watchGetPotlukkById(){
    yield takeEvery("REQUEST_GET_POTLUKK_BY_ID", getPotlukkByIdForm)
}

// export function* getUserByIdFormInvite(action: RequestUserIdAction){
//     try{
//         const lukker: LukkerUserInfo  = yield getUserById(action.payload);
//         yield put({type:"INVITE_BUTTON",payload: lukker});
//     }catch(e){
//         yield put({type:"SET_ERROR_ACTION", payload: e, error:true
//         });
//     }
// }
//watcher sagas

export function* watchSignInUser(){
    yield takeEvery("SIGN_IN_USER", signInUser)
}
export function* watchCreatePotlukk(){
    yield takeEvery("REQUEST_CREATE_POTLUKK", createPotlukkByForm)
}

// export function* watchGetUserByIdInvite(){
//     yield takeEvery("REQUEST_USER_BY_ID", getUserByIdFormInvite)
// }

export function* watcheditPotlukkByForm(){
    yield takeEvery("REQUEST_EDIT_POTLUKK", editPotlukkByForm)
}

export function* watchGetPotlukkDetails(){
    yield takeEvery("REQUEST_POTLUKK_DETAILS",getPotlukkDetails)
}

export function* watchGetUsers(){
    yield takeEvery("REQUEST_GET_USERS", getUsers)
}

export function* watchCancelPotlukk(){
    yield takeEvery("REQUEST_CANCEL_POTLUKK", cancelPotlukk)
}



//root saga
export function* rootSaga(){

    yield all([ watchCreatePotlukk(),watchSignInUser(), watcheditPotlukkByForm(),watchGetUsers(),watchGetPotlukkDetails(),watchCancelPotlukk(),watchGetPotlukkById()]) 
}

//  function* getUserById(payload: string) {
//      throw new Error("Function not implemented.");
// //  }yield invited.forEach((item)=>  {
//     sendInvite(
//         {
//         potlukkId: potlukk.potlukkId,
//         potlukkerId: item.userId
//     })})
//     yield put({type:"CLEAR_INVITE_ACTION"});



