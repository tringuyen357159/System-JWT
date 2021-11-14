import React from 'react';
import { Nav, Navbar, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { LogoutUserSuccess } from '../../../actions/authAction';
import axios from 'axios';
import axiosClient from '../../../api/axiosClient';

const NavbarMenu = () => {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(LogoutUserSuccess())
    }

    const handleText = async () => {
        const res = await axiosClient.get('http://localhost:5000/api/auth/check-login');
    }

    return (
        <Navbar expand="lg" bg="primary" variant="dark" className="shadow px-3" >
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav" className="d-flex justify-content-between">
                <Nav>
                    <Nav.Link>
                        Dashboard
                    </Nav.Link>
                    <Nav.Link>
                        About
                    </Nav.Link>
                </Nav>

                <Nav>
                    <Nav.Link disabled className="font-weight-bolder text-white">
                        Welcome {user.username}
                    </Nav.Link>
                    <Button className="font-weight-bolder text-white" variant="danger" onClick={handleLogout}>
                        Logout
                    </Button>
                    <Button onClick={handleText}>text</Button>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavbarMenu
