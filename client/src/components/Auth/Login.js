import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import { LoginUserSuccess } from '../../actions/authAction';
import { handleServiceLogin } from '../../services/authService'


const Login = () => {
    const user = useSelector(state => state.user);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const [alert, setAlert] = useState(null)

    const handleLogin = async (e) => {
        e.preventDefault();
        const data = {username, password};
        const res = await handleServiceLogin(data);
        if(res.success === true) {
            dispatch(LoginUserSuccess(res))
        }else{
            setAlert({type: 'danger', message: res.message});
            setTimeout(() => {
                setAlert(null)
            }, 3000)
        }
    }

    return user.isLogin === true ? <Redirect to="/" /> :
    (
        <div className="login-container">
            <div className="login-content">
                <h1>FORM LOGIN</h1>
                <Form onSubmit={handleLogin}>
                    <Form.Group>
                        <Form.Control
                            placeholder="Username" 
                            type="text"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="my-3">
                        <Form.Control
                            placeholder="Password" 
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    {alert === null ? null : <Alert variant={alert.type}>{alert.message}</Alert>}
                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default Login
