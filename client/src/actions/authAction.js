

export const LoginUserSuccess = (data) => {
    return {
        type: 'LOGIN_USER_SUCCESS',
        payload: data
    }
}


export const LogoutUserSuccess = () => {
    return {
        type: 'LOGOUT_USER_SUCCESS',
        payload: ''
    }
}

 