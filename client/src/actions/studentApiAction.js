import axiosClient from "../api/axiosClient";
import { toast } from 'react-toastify';

export const getAllStudentSuccess = (data) => {
    return async (dispatch, getState) => {
        try {
            const res = await axiosClient.get('http://localhost:5000/api/student/getAll');
            if(res && res.data && res.data.success === true) {
                dispatch({
                    type: 'GET_ALL_STUDENT_SUCCESS',
                    payload: res.data.students
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export const deleteStudentSuccess = (id) => {
    return async (dispatch, getState) => {
        try {
            const res = await axiosClient.delete(`http://localhost:5000/api/student/delete/${id}`);
            if(res && res.data && res.data.success === true) {
                toast.success("Delete Student successfuly")
                dispatch({
                    type: 'DELETE_STUDENT_API_SUCCESS',
                    payload: id
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export const updateStudentApiSuccess = (student) => {
    return async (dispatch, getState) => {
        try {
            const res = await axiosClient.put(`http://localhost:5000/api/student/update/${student._id}`, student);
            if(res && res.data && res.data.success === true) {
                toast.success("Update student successfully!");
                dispatch({
                    type: 'UPDATE_STUDENT_API_SUCCESS',
                    payload: res.data.student
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export const createStudentApiSuccess = (student) => {
    return async (dispatch, getState) => {
        try {
            const res = await axiosClient.post('http://localhost:5000/api/student/create', student);
            if(res && res.data && res.data.success === true) {
                toast.success("Create student successfully!");
                dispatch({
                    type: 'CREATE_STUDENT_API_SUCCESS',
                    payload: res.data.newStudent
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
}