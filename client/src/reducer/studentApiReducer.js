const initialState = {
    students: [],
    isLoading: true
}


const studentApiReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ALL_STUDENT_SUCCESS':
            state.students = action.payload
            return {
                ...state,
                isLoading: false
            }
        case 'DELETE_STUDENT_API_SUCCESS':
            return {
                ...state,
                students: state.students.filter(item => item._id !== action.payload)
            }
        case 'CREATE_STUDENT_API_SUCCESS': 
            return {
                ...state,
                students: [...state.students, action.payload]
            }
        case 'UPDATE_STUDENT_API_SUCCESS': 
            return {
                ...state,
                students: state.students.map(item => item._id === action.payload._id ? action.payload : item)
            }
        default:
            return  state;
    }
}

export default studentApiReducer