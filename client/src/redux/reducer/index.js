import Cookies from "js-cookie";
const initialState = {
    session: null,
    user: [],
    cart: [],
    allCarts: [],

}
function rootreducer(state = initialState, action) {
    switch (action.type) {
        case 'REGISTER':
            return {
                ...state,
                user: action.payload
            }
        case 'LOGIN':
            return {
                ...state,
                session: action.payload,
            }
        case 'LOGOUT':
            Cookies.remove('session')
            return {
                ...state,
                session: null,
                user: {},
            };
        case 'GET_CARTS':
            console.log(action.payload);
            return {
                ...state,
                allCarts: Array.isArray(action.payload.carts) ? action.payload.carts : []

            }
        

        default:
            return state;
    }
}

export default rootreducer;