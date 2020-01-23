export default function(state={},action){
    switch (action.type) {
        case "GET_INSTRUCTOR":
            return{
                ...state,
                instructor:action.payload
            }
        default:
            return state
    }
}