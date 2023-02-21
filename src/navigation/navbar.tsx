import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LukkerUserInfo, LukkerUserState, PotlukkActions } from "../reducers/potlukk-reducer";
import styled from 'styled-components';



export function NavBar(){

    const currentUserState = useSelector((store:LukkerUserState) => store.currentUser);
    const dispatch = useDispatch()<PotlukkActions>;
    const router = useNavigate()

    function logOut(){
        const noUser:LukkerUserInfo = {
            userId: 0,
            username:  '',
            fname:     '',
            lname:     '',
            allergies: []
        }
        dispatch({type:"SET_USER", payload:noUser})
        router("/")
    }

    const NavbarWrapper = styled.nav`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    background-color: green;
    color: white;
    
  `;
  
  const NavList = styled.ul`
    display: flex;
    flex-direction: row;
    list-style: none;
    margin: 0;
    padding: 0;

    
  `;
  
  const NavItem = styled.li`
    margin-left: 100px;

    &:hover {
      background-color: yellow;
    }

    
  `;
  
  const NavLink = styled.a`
    color: black;
    text-decoration: none;
    font-weight: bold;
    font-size: 20px;
    

    
  `;
  
  

    return <> 
    <NavbarWrapper>
     
     <NavList>
       
       <NavItem><NavLink href="/home">Home</NavLink></NavItem>
       <NavItem><NavLink href="/Invitaions">Invitations</NavLink></NavItem>
       <NavItem><NavLink href="/Host">Host</NavLink></NavItem>
       <NavItem><NavLink href="/detail">Host Details</NavLink></NavItem>
       <NavItem><NavLink href="/registration">Registration</NavLink></NavItem>
       
       
       <NavItem><NavLink href=""></NavLink></NavItem>
     
       
       
       


       <NavItem><NavLink href="/">Logout</NavLink></NavItem>
        
     </NavList>
     
    
   </NavbarWrapper>
    
    </>

}