import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/home-page';
import { RegistrationPage } from './pages/registration-page';
import { SignInpage } from './pages/sign-in-page';
import { Provider } from 'react-redux';
import createSagaMiddleware from '@redux-saga/core';
import { lukkerUserReducer } from './reducers/potlukk-reducer';
import { createStore, applyMiddleware } from '@reduxjs/toolkit';
import { rootSaga } from './sagas/potlukk-saga';
import { Hostpage } from './pages/host-page';
import { DetailHost } from './pages/details-host-page';


const sagaMiddleware = createSagaMiddleware()
const potlukkStore = createStore(lukkerUserReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga)


function App() {
  return  <>
    <Provider store={potlukkStore}>
   <BrowserRouter>
   
   <Routes>
     
     <Route path='/' element={<SignInpage/>}/>
     <Route path='/home' element={<HomePage/>}/>
     <Route path='/registration' element={<RegistrationPage/>}/>
     <Route path='/host' element={<Hostpage/>}/>
     <Route path='/detail' element={<DetailHost/>}/>
     



   </Routes>

  </BrowserRouter>
  </Provider>
  </>
  
  
}

export default App;
