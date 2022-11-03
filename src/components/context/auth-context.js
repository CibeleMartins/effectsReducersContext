import React, {useState, useEffect} from "react";


const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogout: ()=> {},
    onLogin: (email, password)=> {},

});

export const AuthContextProvider = ({children})=> {

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


    return (<AuthContext.Provider value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler
    }}>
        {children}
    </AuthContext.Provider>)
};


export default AuthContext;