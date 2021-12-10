import axios from "axios"
import { toast } from 'react-toastify';


export const fetchStudentSuccess = (data) => {
    return {
        type: 'FETCH_STUDENT_SUCCESS',
        payload: data
    }
}

export const fetchCitySuccess = (data) => {
    return {
        type: 'FETCH_CITY_SUCCESS',
        payload: data
    }
}

export const createNewStudentSuccess = (data) => {
    return async (dispatch, getState) => {
        try {
            const res = await axios.post(`http://js-post-api.herokuapp.com/api/students`, data);
            if(res) {
                dispatch({
                    type: 'CREATE_NEW_STUDENT_SUCCESS',
                    payload: res.data
                })
            }else{
                toast.error("Create student fail!");
            }
        } catch (error) {
            
        }
    }
}

export const deleteStudentSuccess = (id) => {
    return async (dispatch, getState) => {
        try {
            const res = await axios.delete(`http://js-post-api.herokuapp.com/api/students/${id}`);
            if(res.status === 200) {
                dispatch({
                    type: 'DELETE_STUDENT_SUCCESS',
                    payload: id
                })
                toast.success("Delete student successfully!");
            }else{
                toast.error("Delete student fail!");
            }
        } catch (error) {
            
        }
    }
}

export const editStudentSuccess = (data) => {
    return async (dispatch, getState) => {
        try {
            const res = await axios.get(`http://js-post-api.herokuapp.com/api/students/${data.id}`);
            if(res.status === 200) {
                dispatch({
                    type: 'EDIT_STUDENT_SUCCESS',
                    payload: res.data
                })
            }
        } catch (error) {
            
        }
    }
}

export const updateStudentSuccess = (data) => {
    console.log(data);
    return async (dispatch, getState) => {
        try {
            const res = await axios.patch(`http://js-post-api.herokuapp.com/api/students/${data.id}`, data);
            if(res) {
                dispatch({
                    type: 'UPDATE_STUDENT_SUCCESS',
                    payload: res.data
                })
            }else{
                toast.error("Update student fail!");
            }
        } catch (error) {
            
        }
    }
}