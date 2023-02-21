import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { LukkerUserState, Potlukk, PotlukkActions, RequestPotlukkDetailsAction } from "../reducers/potlukk-reducer";
import { NavBar } from "../navigation/navbar";

import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";


const Container_home = styled.div`
display: flex;
justify-content: center;
background-color: white;
  padding: 10px;
`;

const List_home = styled.div`
list-style: none;
margin: 5px;
border: 2px solid #ccc;
padding: 10px;
width: 250px;
height: 400px;
float: center;
overflow: auto;
`;

const ActionList_home = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
  `;

  const ActionListItem_home = styled.li`
    padding: 5px;
    border-bottom: 1px solid #ccc;

    &:hover {
      background-color: green;
    }
  `;

  const Title_home = styled.h2`
    margin-top: 0;
    text-align: center;
  `;


export function HomePage(){

  hostId: Number(localStorage.getItem("userid"))
        
      
    const potlukkListhome = useSelector((store: LukkerUserState) => store.potlukkList);    
    const potlucks = JSON.parse(localStorage.getItem("pottulukks") || "[]");
     const dispatch = useDispatch()<RequestPotlukkDetailsAction>;    
     const sendDispatch = useDispatch()<PotlukkActions>
    
     useEffect(()=>{
         dispatch({type:"REQUEST_POTLUKK_DETAILS"})
     },[])   

     
     //const currentuserpotlucks = potlucks.filter(((item: string) => item.includes(localStorage.getItem("userid") || "")));

    // const currentuserpotlucks = potlucks.filter((item: any) => item.host.userId === localStorage.getItem("userid"))
    
  
    return<>
        <NavBar />
        
        <Container_home>
           
          
          
          <List_home>
          
            <Title_home>Hosted Potlukks - {potlucks.length}</Title_home>
            <ActionList_home>
                {potlucks.map((item: any, index: number) => (
                //   <ActionListItem_home key={index} onClick={sendDispatch({type: "REQUEST_GET_POTLUKK_BY_ID", payload: item.potlukkId})>
                //   <Link={/detail}> Potluck #{item.potlukkId}</ActionListItem_home>
                // ))}
                <ActionListItem_home key={index} onClick={() => sendDispatch({type: "REQUEST_GET_POTLUKK_BY_ID", payload: item.potlukkId})}>
              <Link to="/detail"> Potluck #{item.potlukkId}</Link>
          </ActionListItem_home>))}
            </ActionList_home>

            

          </List_home>

             
          <List_home>
          
          <Title_home>Invited Potlukks</Title_home>
          <ActionList_home>
            
          </ActionList_home>
        </List_home>

         
        <List_home>
          
          <Title_home>Notifications </Title_home>
          <ActionList_home>
           
          </ActionList_home>
        </List_home>

          </Container_home>

          
      </>
  }