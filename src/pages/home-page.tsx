import { useNavigate } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom';
import { NavigationBar } from '../navigation/navbar';
import styled from 'styled-components';



export function HomePage() {
    const navigate = useNavigate();

    function gotosignin(){
      navigate('/sign');

    }

    const Container = styled.div`
        display: flex;
        justify-content: space-between;
        align-items: center;
      `;

      const LogoutButton = styled.button`
        background-color: #333;
        color: white;
        border: none;
        padding: 8px 16px;
        font-size: 16px;
      `;

    const headingStyles = {
        color: 'blue',
        marginBottom: '2rem',
      };
    
      const buttonStyles = {
        backgroundColor: 'green',
        color: 'white',
        padding: '1rem 2rem',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        alignItems: 'right'
      };


    return<>
    
    

            
        <div color='green'> <h1 style={headingStyles}> <center> Welcome to Potlukk page {localStorage.getItem("loggedinUser")} </center></h1> </div>
        
        <Container>
           <h1></h1>
          <LogoutButton onClick={gotosignin}>Logout</LogoutButton>
        </Container>

        <NavigationBar/> 
        </>
}