import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NavigationBar } from './navigation/navbar';
import { PotlukkDetailsGuestPage } from './pages/details-guest-page';
import { PotlukkDetailsHostPage } from './pages/details-host-page';
import { HomePage } from './pages/home-page';
import { RegistrationPage } from './pages/registration-page';
import { SignInPage } from './pages/sign-in-page';



function App() {
  return  <>
  
   <BrowserRouter>
   
   <Routes>
     
     <Route path='/sign' element={<SignInPage/>}/>
     <Route path='/' element={<HomePage/>}/>
     <Route path='/registration' element={<RegistrationPage/>}/>
     <Route path='/detailsGuest' element={<PotlukkDetailsGuestPage/>}/>
     <Route path='/detailsHost' element={<PotlukkDetailsHostPage/>}/>



   </Routes>

  </BrowserRouter>
  </>
  
  
}

export default App;
