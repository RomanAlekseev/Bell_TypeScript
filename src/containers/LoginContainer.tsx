import {connect} from 'react-redux';
import LoginComponent from '../components/LoginComponent';
import {loginHandleChange, passwordHandleChange, submitLogin} from "../actions/actions";
import {IDispatch, IStore} from "../helpers/Interfaces";
import {ChangeEvent} from "react";

const mapStateToProps = (state: IStore) => {
    return {
        admin: state.loginReducer.isLoggedIn,
        login: state.loginReducer.login,
        password: state.loginReducer.password,
        error: state.loginReducer.error,
        isLoading: state.loginReducer.isLoading,
        user: state.loginReducer.user,
    }
};


const mapDispatchToProps = (dispatch: IDispatch<IStore> )=> {
    return {
        loginHandleChange: (event: ChangeEvent<HTMLInputElement>) => dispatch(loginHandleChange(event)),
        passwordHandleChange: (event: ChangeEvent<HTMLInputElement>) => dispatch(passwordHandleChange(event)),
        submitLogin: (login: string, password: string) => dispatch(submitLogin(login, password)),
    }
};

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(LoginComponent);

export default LoginContainer;