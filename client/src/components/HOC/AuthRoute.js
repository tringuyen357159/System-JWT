import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const AuthRoute = (props) => {
    const user = useSelector(state => state.user);

    if(!user.isLogin) 
        return <Redirect to="/login" />

    return <Route {...props} />
    
}

export default AuthRoute
