import axios from "axios";

 import { getAuthToken, setAuthToken } from "../../Auth/Auth";

export function register(newUser) {
    return async function (dispatch) {
        const response = await axios.post("http://localhost:3001/api/register", newUser);
        console.log(response)

        dispatch({
            type: 'REGISTER',
            payload: response.data
        })

    }

}
export function login(formData) {
    // console.log("la data", formData)
    return async function (dispatch) {
        try {
            const responseLogin = await axios.post("http://localhost:3001/api/login", formData)
            const token = responseLogin.data.token;
            console.log(responseLogin)


            setAuthToken(token);

            dispatch({
                type: 'LOGIN',
                payload: responseLogin.data
            })

            return responseLogin;
        } catch (error) {
            console.log('Error al iniciar sesion:', error.message);
            if (error.response) {
                console.log('Error de respuesta:', error.response.data);
            }
            throw error;
        }
    }
}
export const logout = () => {
    return {
        type: 'LOGOUT',
    };
};
export function products() {
    return async function(dispatch) {
        try {
            const token = getAuthToken();
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            };
            const response = await axios.get('http://localhost:3001/api/product', config);
            console.log(response.data)
            // Envía solo los datos de los productos como payload
            return dispatch({
                type: 'GET_CARTS',
                payload: response.data, // Envía response.data en lugar de response completa
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    };
}
