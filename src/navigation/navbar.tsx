import { Link } from "react-router-dom";
import styled from 'styled-components';




export function NavigationBar() {

  const NavbarWrapper = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  background-color: #333;
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
  margin-left: 130px;
`;

const NavLink = styled.a`
  color: white;
  text-decoration: none;
  font-weight: bold;
  font-size: 20px;
`;



    return <>
   
    <NavbarWrapper>
     
      <NavList>
        
        <NavItem><NavLink href="/">Home</NavLink></NavItem>
        <NavItem><NavLink href="/Invitaions">Invitations</NavLink></NavItem>
        <NavItem><NavLink href="/Host">Host</NavLink></NavItem>
        <NavItem><NavLink href="/Discover">Discover</NavLink></NavItem>
        <NavItem><NavLink href="/Settings">Settings</NavLink></NavItem>
         
      </NavList>
      
     
    </NavbarWrapper>

    
    </>
}