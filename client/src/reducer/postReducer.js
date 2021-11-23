
const initialState = {
    postList: []
}


const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_POST_SUCCESS':
            state.postList = action.payload
            return {
                ...state,
            }
        default:
            return  state;
    }
}

export default postReducer