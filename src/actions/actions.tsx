import {
    AUTH_ERROR,
    AUTH_RECEIVE,
    AUTH_REQUEST,
    CHANGE_MODAL_INPUT_ORGANIZATION,
    CHANGE_TO_FALSE_MODAL_INPUT_ORGANIZATION,
    CLOSE_INPUT_MODAL,
    CLOSE_MODAL,
    LOGIN_HANDLE_CHANGE,
    LOGIN_SUBMIT,
    OPEN_INPUT_MODAL,
    OPEN_MODAL,
    ORGANIZATION_ADDRESS_HANDLE_CHANGE,
    ORGANIZATION_ID_HANDLE_CHANGE,
    ORGANIZATION_INN_HANDLE_CHANGE,
    ORGANIZATION_TITLE_HANDLE_CHANGE,
    PASSWORD_HANDLE_CHANGE,
    RECEIVE_ORGANIZATIONS,
    REQUEST_ORGANIZATIONS,
    SET_EDITED_ORGANIZATION
} from "../constants/actionsTypes";
import { LOG_OUT } from "../constants/actionsTypes";
import { ADD_ORGANIZATION } from "../constants/actionsTypes";
import { DELETE_ORGANIZATION } from "../constants/actionsTypes";
import { CHANGE_ORGANIZATION } from "../constants/actionsTypes";
import {deleteCookie, setCookie} from "../helpers/cookies";
import {IAction, IOrganization, IStore, IUser, MyThunkAction} from "../helpers/Interfaces";
import {ChangeEvent} from "react";
import {Action} from "redux";
import {ThunkDispatch} from "redux-thunk";

//organization actions
export function requestOrganizations(): IAction {
    return {
        type: REQUEST_ORGANIZATIONS,
    }
}

export function receiveOrganizations(organizations: IOrganization): IAction {
    return {
        type: RECEIVE_ORGANIZATIONS,
        payload: organizations,
    }
}

export function fetchOrganizations(): MyThunkAction<Promise<Array<IOrganization>>> {
    return (dispatch: ThunkDispatch<IStore, null, Action>) => {
        dispatch(requestOrganizations());
        const request = async () => {
             const response = await fetch('http://www.mocky.io/v2/5c45a214320000822caf185d');
            console.log(response);
            const json = await response.json();
            dispatch(receiveOrganizations(json));
            return json;
        };

        return request();
    }
}

export function orgTitleHandleChange(e: ChangeEvent<HTMLInputElement>): IAction
{
    return {
        type: ORGANIZATION_TITLE_HANDLE_CHANGE,
        payload: e.target.value,
    }
}

export function orgAddressHandleChange(e: ChangeEvent<HTMLInputElement>): IAction
{
    return {
        type: ORGANIZATION_ADDRESS_HANDLE_CHANGE,
        payload: e.target.value,
    }
}

export function orgInnHandleChange(e: ChangeEvent<HTMLInputElement>): IAction
{
    return {
        type: ORGANIZATION_INN_HANDLE_CHANGE,
        payload: e.target.value,
    }
}

export function orgIdHandleChange(e: ChangeEvent<HTMLInputElement>): IAction
{
    return {
        type: ORGANIZATION_ID_HANDLE_CHANGE,
        payload: e.target.value,
    }
}

export function addOrganization(): IAction {
  return {
      type: ADD_ORGANIZATION,
  };
}
export function deleteOrganization(): IAction {
  return {
      type: DELETE_ORGANIZATION,
  };
}
export function changeOrganization(): IAction {
  return {
      type: CHANGE_ORGANIZATION,
  };
}

export function setEditedOrganization(id: number): IAction
{
    return {
        type: SET_EDITED_ORGANIZATION,
        payload: id,
    }
}

export function changeModalInputOrg(): IAction
{
    return {
        type: CHANGE_MODAL_INPUT_ORGANIZATION,
    }
}

export function changeToFalseModalInputOrg(): IAction
{
    return {
        type: CHANGE_TO_FALSE_MODAL_INPUT_ORGANIZATION,
    }
}

export function openInputModal(): IAction {
    return {
        type: OPEN_INPUT_MODAL,
    };
}

export function closeInputModal(): IAction {
    return {
        type: CLOSE_INPUT_MODAL,
    };
}

export function openModal(targetOrg: number): IAction {
    return {
        type: OPEN_MODAL,
        payload: targetOrg,
    };
}

export function closeModal(): IAction {
    return {
        type: CLOSE_MODAL,
    };
}

export function logOut(): IAction {
    deleteCookie('user');
    return {
        type: LOG_OUT,
    };
}

export function loginHandleChange(event: ChangeEvent<HTMLInputElement>): IAction
{
    return {
      type: LOGIN_HANDLE_CHANGE,
      payload: event.target.value,
    }
}

export function passwordHandleChange(event: ChangeEvent<HTMLInputElement>): IAction
{
    return {
        type: PASSWORD_HANDLE_CHANGE,
        payload: event.target.value,
    }
}

export function submitLogin(login: string, password: string): MyThunkAction<IAction>
{
    return (dispatch: ThunkDispatch<IStore, null, Action>) => {
        dispatch(authFetch(login, password));

        return {
            type: LOGIN_SUBMIT,
        }
    }
}

export function authFetch(login: string, password: string): MyThunkAction<void>
{
    let user: IUser = {
        login,
        password,
    };

    return (dispatch: ThunkDispatch<IStore, null, Action>) => {
        dispatch(authRequest());
        setTimeout(
            () => {
                if(login === "admin" && password === "1")
                {
                    setCookie('user', user, {});
                    dispatch(authReceive());
                }
                else
                {
                    dispatch(authError());
                }
            },
            1500
        );
    }
}

export function authRequest(): IAction {
    return {
        type: AUTH_REQUEST,
    }
}

export function authReceive(): IAction {
    return {
        type: AUTH_RECEIVE,
    }
}

export function authError(): IAction
{
    return {
        type: AUTH_ERROR,
    }
}