import axios from 'axios';
import jwt_decode from "jwt-decode";


const axiosClient = axios.create();

const getToken = () => {
    const token = JSON.parse(localStorage.getItem('persist:user'));

    if(token)
        return token.token.split('"').join('');
    else 
        return null;
}

const refreshToken = async () => {
    try {
        const refToken = JSON.parse(localStorage.getItem('persist:user'));
        const res = await axios.post("http://localhost:5000/api/auth/refreshtoken", {token: refToken.refreshToken.split('"').join('')});
        if(res) {   
            ///lưu lại token vào localstorage  
            return res.data.accessToken
        }
    } catch (err) {
      console.log(err);
    }
  };

axiosClient.interceptors.request.use(async (config) => {
  
    let currentDate = new Date();
    const token = await getToken();
    const decodedToken = jwt_decode(token);

    if(decodedToken.exp * 1000 > currentDate.getTime()) {
        config.headers.Authorization = `Bearee ${token}`;
    }
    else if(decodedToken.exp * 1000 < currentDate.getTime()) {
        const refToken = await refreshToken();
        config.headers.Authorization = `Bearee ${refToken}`;
    }
  
    return config;
});


export default axiosClient;
  