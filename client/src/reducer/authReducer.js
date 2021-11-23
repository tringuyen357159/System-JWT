import jwtDecode from 'jwt-decode';

const initialState = {
    isLoading: true,
    isLogin: false,
    token: '',
    refreshToken: '',
    username: '',
    id: ''
}

const userReducer = (state = initialState, action) => {
    switch (action.type){
        case 'LOGIN_USER_SUCCESS':
            const user = jwtDecode(action.payload.accessToken)
            localStorage.setItem('USER_TOKEN', JSON.stringify(action.payload.accessToken));
            return {
                ...state,
                isLoading: false,
                isLogin: true,
                token: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
                username: user.username,
                id: user.userId
            }
        case 'LOGOUT_USER_SUCCESS':
            localStorage.removeItem('USER_TOKEN');
            return {
                ...state,
                isLogin: false,
                token: '',
                refreshToken: '',
                username: '', 
                id: ''
            }
        case 'LOAD_USER': 
            const userLoad = jwtDecode(action.payload.token)
            
            return {
                ...state,
                isLoading: false,
                isLogin: true,
                token: action.payload.token,
                username: userLoad.username,
                id: userLoad.userId
            }
        default:
            return {
                ...state
            }
    }
}

export default userReducer