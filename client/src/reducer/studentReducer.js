const initialState = {
    studentList: [],
    cityList: [],
    student: null
}


const studentReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_STUDENT_SUCCESS':
            state.studentList = action.payload
            return {
                ...state,
            }
        case 'FETCH_CITY_SUCCESS':
            state.cityList = action.payload
            return {
                ...state
            }
        case 'CREATE_NEW_STUDENT_SUCCESS': 
            return {
                ...state,
                studentList: [...state.studentList, action.payload]
            }
        case 'DELETE_STUDENT_SUCCESS':
            return {
                ...state,
                studentList: state.studentList.filter(item => item.id !== action.payload)
            }
        case 'EDIT_STUDENT_SUCCESS':
            return {
                ...state,
                student: action.payload
            }
        case 'UPDATE_STUDENT_SUCCESS': 
        console.log(action);
            return {
                ...state,
                studentList: state.studentList.map(item => item.id === action.payload.id ? action.payload : item)
            }
        default:
            return  state;
    }
}

export default studentReducer