import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { combineReducers, createStore } from 'redux';
import { PotlukkDetailsGuestPage } from './pages/details-guest-page';
import { PotlukkDetailsHostPage } from './pages/details-host-page';
import { HomePage } from './pages/home-page';
import { RegistrationPage } from './pages/registration-page';
import { SignInPage } from './pages/sign-in-page';
import rootReducer from './reducers/root-reducer';


const appStore = createStore(rootReducer)

function App() {
  

 

  return  <>
   <Provider store={appStore}>
   <BrowserRouter>
   
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

//potlukkId={1} in details host page ----- /:idOfPotlukk in path