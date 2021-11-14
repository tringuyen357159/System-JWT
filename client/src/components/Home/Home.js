import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import NavbarMenu from './NavbarMenu/NavbarMenu';

const Home = () => {
    const user = useSelector(state => state.user);

    return user.isLogin === false ? <Redirect to="/login" /> : (
        <div>
            <NavbarMenu />
        </div>
    )
}

export default Home
