import axios from 'axios';
import { AT_USERS } from './action_types';
import { ENDPOINT } from '../../../Constantes';


export const addUserCredential = (datas) => {
    return (dispatch) => {
        axios.post(`${ENDPOINT}/users/signin`, {
				login: datas.login,
                email: datas.email,
                password: datas.password,
			}).then((response) => {
                dispatch({
                    type: AT_USERS.LOGIN,
                    payload: response.data
                })
            }).catch((err) => {
                console.log(err)
            })
    }

}

export const removeUserCredential = (datas) => {
    return (dispatch) => {
        dispatch({
            type: AT_USERS.LOGOUT,
            payload: datas
        })
    }

}

export const timeoutUserToken = (datas) => {
    return (dispatch) => {
        
        axios.get(`${ENDPOINT}/commons/checkAuth/${datas}`)
             .then((response) => {
                console.log(response.data.response)
                if(response.data.response === null) {
                    dispatch({
                        type: AT_USERS.LOGOUT,
                        payload: datas
                    })
                } else {
                    console.log("OK !")
                }
            }).catch((err) => {
                console.log(err)
            })
    }

}