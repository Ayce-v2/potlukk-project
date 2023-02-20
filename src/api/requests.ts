import { SignInForm } from "../pages/sign-in-page";
import { PotlukkCreationInputState } from "../reducers/potlukk-create-reducer";
import { PotlukkEditInputState } from "../reducers/potluck-edit-reducer";
import { CreateUserForm,InvitationSendInput, LukkerUserInfo, Potlukk, PotlukkNotification, PotlukkNotificationInput } from "../reducers/potlukk-reducer";

export type VerifySignin = {
  username: string;
  password: string;
}

export async function verifyUser(params:SignInForm):Promise<LukkerUserInfo>{
  const httpResponse = await fetch("http://127.0.0.1:8000/verify", {
      method:"POST",
      body:JSON.stringify(params),
      headers:{"Content-Type":"application/json"}
  });
  const currentUser = await httpResponse.json();
  return currentUser;
}
export async function createUser(params:CreateUserForm):Promise<LukkerUserInfo> {
  const httpResponse = await fetch("http://127.0.0.1:8000/lukkers", {
      method:"POST",
      body:JSON.stringify(params),
      headers:{"Content-Type":"application/json"}
  });
  const newUser = await httpResponse.json();
  return newUser;
}

export async function createPotlukk(form:PotlukkCreationInputState):Promise<Potlukk>{

  const query = `mutation createAPotlukk($CreationInput: PotlukkCreationInput!){
      createPotlukk(input: $CreationInput){
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
      }
    `
  const variables = {CreationInput:form}
  const body = JSON.stringify({query:query,variables:variables})

  const httpResponse = await fetch("http://127.0.0.1:8000/graphql", {method:"POST", body, headers:{"Content-Type":"application/json"}});
  const responseBody = await httpResponse.json();
  const potlukk:Potlukk = responseBody.data;
  return potlukk
}

export async function editPotlukk(form: PotlukkEditInputState):Promise<Potlukk>{

  const query = `mutation editPotlukk($input: PotlukkDetailsSwapInput!){
    swapPotlukkDetails(input: $input){
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
  const potlukk:Potlukk = responseBody.data.swapPotlukkDetails;
  return potlukk
}

export async function addNotification(params:PotlukkNotificationInput):Promise<PotlukkNotification> {
  const query = `mutation AddNotification($input: PotlukkNotificationInput!) {
    addNotification(input: $input) {
      affectedPotlukkId
      createdByUser
      description
      kind
      eventId
      timestamp
    }
  }`

  const variables = {input:params}
  const body = JSON.stringify({query:query,variables:variables})
  const httpResponse = await fetch("http://127.0.0.1:8000/graphql", {method:"POST", body, headers:{"Content-Type":"application/json"}});
  const responseBody = await httpResponse.json();
  const result:PotlukkNotification = responseBody.data;
  return result
}

export async function getNotifications():Promise<PotlukkNotification[]>{
  const query =`query getNotifications {
    notifications {
      affectedPotlukkId
      createdByUser
      description
      eventId
      kind
      timestamp
    }
  }`

  const body = JSON.stringify({query:query})
  const httpResponse = await fetch("http://127.0.0.1:8000/graphql", {method:"POST", body, headers:{"Content-Type":"application/json"}});
  const responseBody = await httpResponse.json();
  const result:PotlukkNotification[] = responseBody.data.notifications;
  return result
}

export async function sendInvite(form: InvitationSendInput):Promise<Potlukk>{

  const query = `mutation SendInvite($input: InvitationSendInput!){
    sendInvite(input: $input){
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
  const potlukk:Potlukk = responseBody.data;
  return potlukk
}

export async function getPotlukkuserDetails():Promise<Potlukk[]>{
  const query = `query getPotlukkUserDetails {
    potlukks {
      host {
        userId
      }
      invitations {
        potlukker {
          userId
        }
        status
      }
      potlukkId
    }
  }`
  const body = JSON.stringify({query:query})
  const httpResponse = await fetch("http://127.0.0.1:8000/graphql", {method:"POST", body, headers:{"Content-Type":"application/json"}});
  const responseBody = await httpResponse.json();
  const potlukk:Potlukk[] = responseBody.data.potlukks;
  return potlukk
}

export async function getAllUsers():Promise<LukkerUserInfo[]>{
    const httpResponse = await fetch("http://127.0.0.1:8000/lukkers", {
        method:"Get",
        headers:{"Content-Type":"application/json"}
    });
    const newUser:LukkerUserInfo[] = await httpResponse.json();
    return newUser;
}

export async function getUserById(params:string):Promise<LukkerUserInfo>{
    const httpResponse = await fetch("http://127.0.0.1:8000/lukkers/"+params, {
        method:"Get",
        headers:{"Content-Type":"application/json"}
    });
    const newUser:LukkerUserInfo = await httpResponse.json();
    return newUser;
}
