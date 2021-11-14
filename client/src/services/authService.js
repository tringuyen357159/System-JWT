import axios from 'axios';


export const handleServiceLogin = async (data) => {
    try {
        let res = await axios.post('http://localhost:5000/api/auth/login', data);
        if(res.data.success === true) {
            return res.data;
        }
    } catch (error) {
        if(error.response.data){
            return error.response.data
        }else{
            return {
                success: false,
                message: error.message
            }
        }
    }
}