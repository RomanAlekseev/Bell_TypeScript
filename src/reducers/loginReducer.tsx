import {
    AUTH_ERROR,
    AUTH_RECEIVE,
    AUTH_REQUEST,
    LOGIN_HANDLE_CHANGE,
    LOGIN_SUBMIT,
    PASSWORD_HANDLE_CHANGE
} from "../constants/actionsTypes";
import { LOG_OUT } from "../constants/actionsTypes";
import {IAction, IError, IloginReducer, IUser} from "../helpers/Interfaces";

const loginInitialState = {
    isLoggedIn: false,
    login: '',
    password: '',
    isLoading: false,
    error: {
        login: false,
        password: false,
    },
    user: {
        login: '',
        password: ''
    },
};

export default function loginReducer(state = loginInitialState, action: IAction): IloginReducer {
    switch (action.type) {
        case LOG_OUT:
            return {
                ...state,
                isLoggedIn: false,
            };

        case LOGIN_HANDLE_CHANGE:
            return {
                ...state,
                login: action.payload,
            };

        case PASSWORD_HANDLE_CHANGE:
            return {
                ...state,
                password: action.payload,
            };

        case LOGIN_SUBMIT:
            return state;

        case AUTH_REQUEST:
            return {
                ...state,
                isLoading: true,
            };

        case AUTH_RECEIVE:
            let user: IUser = {...state.user, login: state.login, password: state.password};
            return {
                ...state,
                user,
                isLoading: false,
            };

        case AUTH_ERROR:
            return {
                ...state,
                error: {
                    login: true,
                    password: true,
                },
                isLoading: false,
            };

        default:
            return state;
    }

}
