import React, {useState,useCallback} from 'react';
import { BrowserRouter as Router,Route,Redirect,Switch } from 'react-router-dom';

import Auth from './user/pages/Auth';
import './App.css';
import { AuthContext } from './shared/context/auth-context';
import MainNavigation from './shared/components/Navigation/MainNavigation';


function App() {
  const [isLoggedIn, setIsLoggedIn]=useState(false);
  const[userId]=useState(false);
  
  const login=useCallback(uid=>{
    setIsLoggedIn(true);
  },[]);

  const logout=useCallback(()=>{
    setIsLoggedIn(false);
    
  },[]);

  let routes;

  // if(!isLoggedIn){
    routes=(
      <Switch>
        <Route path='/auth'>
          <Auth />
        </Route>
        <Redirect to='/auth'/>
      </Switch>
    );
  // } else{
  //   <Switch>
  //       <Route path='/auth'>
  //         <Auth />
  //       </Route>
  //       <Redirect to='/auth'/>
  //     </Switch>
  // }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        userId: userId,
        login: login,
        logout: logout
      }}
      >
        <Router>
          <MainNavigation />
          <main>{routes}</main>
        </Router>
      </AuthContext.Provider>    
  );
};

export default App;
