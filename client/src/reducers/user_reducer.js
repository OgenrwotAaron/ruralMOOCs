export default function(state={},action){
    switch (action.type) {
        case "GET_INSTRUCTOR":
            return{
                ...state,
                instructor:action.payload
            }
        case "GET_USER":
            return{
                ...state,
                user:action.payload
            }
        default:
            return state
    }
}