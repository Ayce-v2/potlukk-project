
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createStore } from 'redux';
import { NavigationBar } from './navigation/navbar';
import { PotlukkDetailsGuestPage } from './pages/details-guest-page';
import { PotlukkDetailsHostPage } from './pages/details-host-page';
import { HomePage } from './pages/home-page';
import { RegistrationPage } from './pages/registration-page';
import { SignInPage } from './pages/sign-in-page';
import { verificationReducer } from './reducers/registration-reducer';



function App() {

  const registrationStore = createStore(verificationReducer)

  return  <>
   <Provider store={registrationStore}>
   <BrowserRouter>
   <NavigationBar/>
   <Routes>
     <Route path='/sign' element={<SignInPage/>}/>
     <Route path='/' element={<HomePage/>}/>
     <Route path='/registration' element={<RegistrationPage/>}/>
     <Route path='/detailsGuest' element={<PotlukkDetailsGuestPage/>}/>
     <Route path='/detailsHost' element={<PotlukkDetailsHostPage/>}/>



   </Routes>

  </BrowserRouter>
  </Provider>
  </>
  
  
}

export default App;
