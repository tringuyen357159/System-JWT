import React from 'react';
import { Nav, Navbar, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { LogoutUserSuccess } from '../../../actions/authAction';
import { Link } from 'react-router-dom';
import axiosClient from '../../../api/axiosClient';

const NavbarMenu = () => {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(LogoutUserSuccess())
    }


    return (
        <Navbar expand="lg" bg="primary" variant="dark" className="shadow px-3" >
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav" className="d-flex justify-content-between">
                <Nav>
                    <Nav.Link className="font-weight-bolder text-white" to="/search-youtube" as={Link}>
                        Youtube
                    </Nav.Link>
                    <Nav.Link className="font-weight-bolder text-white" to="/google-map" as={Link}>
                        Google Map
                    </Nav.Link>
                    <Nav.Link className="font-weight-bolder text-white" to="/blog" as={Link}>
                        Blog
                    </Nav.Link>
                    <Nav.Link className="font-weight-bolder text-white" to="/student" as={Link}>
                        Student
                    </Nav.Link>
                </Nav>

                <Nav>
                    <Nav.Link disabled className="font-weight-bolder text-white">
                        Welcome {user.username}
                    </Nav.Link>
                    <Button className="font-weight-bolder text-white" variant="danger" onClick={handleLogout}>
                        Logout
                    </Button>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavbarMenu
