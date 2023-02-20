import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { LukkerUserInfo, LukkerUserState, PotlukkActions } from "../reducers/potlukk-reducer";
import styled from 'styled-components';
import { getAllUsers } from "../api/requests";



const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const SearchInput = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  width: 120%;
  box-sizing: border-box;
  flex: 1;
`;


const UserList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
`;

const UserListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  margin-bottom: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ActionListItem_home = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  border-bottom: 1px solid #ccc;

  &:last-child {
    border-bottom: none;
  }
  &:hover {
    background-color: lightblue;
  }
`;

const InviteButton = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const List_home = styled.div`
list-style: none;
margin: 5px;
border: 2px solid #ccc;
padding: 10px;
width: 350px;
height: 120px;
float: center;
overflow: auto;
`;

const ActionList_home = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
  `;

  const Title_home = styled.h2`
    margin-top: 0;
    text-align: center;
  `;


const SearchComponent = () => {

  const selector = useSelector((store: LukkerUserState) => store)
  console.log("userlist is" + selector.userList)
    
    const [form,setForm] = useState("");
    const sendDispatch = useDispatch()<PotlukkActions>

    let listArray: LukkerUserInfo[] = [];
    (form !== "") ?
    listArray = selector.userList.filter((item) => item.username === form ) :
    listArray = selector.userList

    const AllUsers = JSON.parse(localStorage.getItem("AllUsers") || "[]");   


    useEffect(()=>{ // use effect for rest gets/ constant display
      
      (async ()=>{
          
          await sendDispatch({type: "REQUEST_GET_USERS", payload: form}); 
          
      })();
      
    },[]);

    const filteredUsers = AllUsers.filter((item: any) =>
    item.username.toLowerCase().includes(form.toLowerCase()) ||
    item.fname.toLowerCase().includes(form.toLowerCase()) ||
    item.lname.toLowerCase().includes(form.toLowerCase())
  );
 
  return (
    <Container style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
       <div>
       <h1> </h1>
      <SearchInput type="text" onChange={(e) =>setForm(e.target.value)} placeholder="Search Lukkers" /> 
      {/* <button onClick={}>Search</button> */}
      </div>   
                                       
      <h3> Lukkers </h3>
      <List_home>                  
            <ActionList_home>
              
              {AllUsers.filter((item: any) => 
                      item.username.toLowerCase().includes(form.toLowerCase()) ||
                      item.fname.toLowerCase().includes(form.toLowerCase()) ||
                      item.lname.toLowerCase().includes(form.toLowerCase())
                  ).map((item: any)=><div><ActionListItem_home key={item.username}>{item.fname} {item.lname} {}
                        <InviteButton onClick={() =>sendDispatch({type: "INVITE_USER_ACTION",
                         payload: item.userId.toString()})}>invite</InviteButton></ActionListItem_home></div>)}
            </ActionList_home>
          </List_home>

          <h3> Invited Lukkers </h3>
      <List_home>                  
            <ActionList_home>
              
              {selector.invited.map((item: any)=><div><ActionListItem_home key={item.username}>{item.fname} {item.lname} {}
                        <InviteButton onClick={() =>sendDispatch({type: "DELETE_INVITE_ACTION",
                         payload: item.userId.toString()})}>Remove Invitee</InviteButton></ActionListItem_home></div>)}
            </ActionList_home>
          </List_home>
        

    </Container>

 
  );
};

export default SearchComponent;
