import {Action} from "redux";
import {ThunkAction, ThunkDispatch} from "redux-thunk";

export interface IOrganization {
    id: string;
    title: string;
    address: string;
    inn: string;
}

export interface IorgReducer {
    organization: Array<IOrganization>;
    modalConfirmIsOpen: boolean;
    ModalInputOrgIsOpen: boolean;
    deleteNumber: number;
    onChanged: boolean;
    isOrganizationsLoading: boolean;
    orgEditId: string;
    orgEditTitle: string;
    orgEditAddress: string;
    orgEditInn: string;
}

export interface IloginReducer {
    isLoggedIn: boolean;
    login: string;
    password: string;
    isLoading: boolean;
    error: IError;
    user: IUser
}

export interface IError {
    login: boolean;
    password: boolean;
}

export interface IUser {
    login: string;
    password: string;
}

export interface IStore {
    loginReducer: IloginReducer,
    orgReducer: IorgReducer,
}

export interface IAction extends Action{
    payload?: any;
}

export type MyThunkAction<R> = ThunkAction<R, IStore, null, Action>;

export type IDispatch<S> = ThunkDispatch<S, null, Action>;