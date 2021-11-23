import axios from 'axios';
import jwt_decode from "jwt-decode";


const axiosClient = axios.create();

const getToken = () => {
    const token = JSON.parse(localStorage.getItem('USER_TOKEN'));

    if(token)
        return token;
    else 
        return null;
}

const refreshToken = async () => {
    try {
        const refToken = JSON.parse(localStorage.getItem('persist:user'));
        const res = await axios.post("http://localhost:5000/api/auth/refreshtoken", {token: refToken.refreshToken.split('"').join('')});
        if(res) {   
            localStorage.setItem('USER_TOKEN', JSON.stringify(res.data.accessToken));
        }
        return res.data.accessToken
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
}, function (error) {
    return Promise.reject(error);
});


export default axiosClient;
  