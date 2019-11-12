import {AT_USERS} from "./Actions/action_types"

// State initial
const initialState = { userDatas: [] }

function userCredentials(state=initialState, action) {
    let nextState
    switch(action.type) {
        case AT_USERS.LOGIN:
            // We clear out userDatas Array
            nextState = {
                ...state,
                userDatas: []
            }
            // We fill in userDatas Array with the API datas
			nextState = {
                ...state,
                userDatas: [ ...state.userDatas, action.payload ]
            }
            return nextState
        
        case AT_USERS.LOGOUT:
			// // We clear out userDatas Array
			nextState ={
				...state,
				userDatas: []
			}
            return nextState

        default:
            return state
    }
}

export default userCredentials