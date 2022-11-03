import React, { useState, useEffect } from 'react';

import AuthContext from './components/context/auth-context';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(()=> {
    const storedUserLoggedInInformation = localStorage.getItem('cibelemartins@hotmail.com');

    if(storedUserLoggedInInformation === '1234567') {
      setIsLoggedIn(true)
    }
  }, [])

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways

    localStorage.setItem(email, password)
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('cibelemartins@hotmail.com')
  };

  return (
    <AuthContext.Provider value={{
      isLogged: isLoggedIn,
      onLogout: logoutHandler
    }}>
      <MainHeader />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </AuthContext.Provider>
  );
}

export default App;
