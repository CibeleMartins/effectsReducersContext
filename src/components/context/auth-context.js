import React from "react";


const AuthContext = React.createContext({
    isLogged: false,
    onLogout: ()=> {}
});


export default AuthContext;