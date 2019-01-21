import {
    ADD_ORGANIZATION,
    CHANGE_MODAL_INPUT_ORGANIZATION,
    CHANGE_ORGANIZATION,
    CHANGE_TO_FALSE_MODAL_INPUT_ORGANIZATION,
    CLOSE_INPUT_MODAL,
    CLOSE_MODAL,
    DELETE_ORGANIZATION,
    OPEN_INPUT_MODAL,
    OPEN_MODAL,
    ORGANIZATION_ADDRESS_HANDLE_CHANGE,
    ORGANIZATION_ID_HANDLE_CHANGE,
    ORGANIZATION_INN_HANDLE_CHANGE,
    ORGANIZATION_TITLE_HANDLE_CHANGE,
    RECEIVE_ORGANIZATIONS,
    REQUEST_ORGANIZATIONS,
    SET_EDITED_ORGANIZATION
} from "../constants/actionsTypes";
import {IAction, IOrganization, IorgReducer} from "../helpers/Interfaces";

const initialState = {
    organization: [] as IOrganization[],
    modalConfirmIsOpen: false,
    ModalInputOrgIsOpen: false,
    deleteNumber: 0,
    onChanged: false,
    isOrganizationsLoading: false,
    orgEditId: '',
    orgEditTitle: '',
    orgEditAddress: '',
    orgEditInn: '',
};

export default function orgReducer(state = initialState, action: IAction): IorgReducer {
    switch (action.type) {
        case ADD_ORGANIZATION:
            let addOrgState = {
                ...state,
                organization: [...state.organization, {
                    id: state.orgEditId,
                    title: state.orgEditTitle,
                    address: state.orgEditAddress,
                    inn: state.orgEditInn,
                }],
            };

            addOrgState.organization.map((org:IOrganization, index:number) => {
                if(addOrgState.organization[index].id === '' &&
                    addOrgState.organization[index].title === '' &&
                    addOrgState.organization[index].address === '' &&
                    addOrgState.organization[index].inn === ''
                )
                {
                    addOrgState.organization.splice(index, 1);
                }
            });

            return addOrgState;

        case DELETE_ORGANIZATION:
            let deleteNumber = state.deleteNumber;
            return {
                ...initialState,
                organization: [
                    ...state.organization.slice(0, deleteNumber),
                    ...state.organization.slice(deleteNumber + 1)
                ],
                deleteNumber: 0,
            };

        case CHANGE_ORGANIZATION:
            let org: Array<IOrganization> = state.organization.slice();
            org.splice(state.deleteNumber, 1, {
                id: state.orgEditId,
                title: state.orgEditTitle,
                address: state.orgEditAddress,
                inn: state.orgEditInn,
            });

            return {
                ...initialState,
                organization: org,
            };


        case OPEN_MODAL:
            return {
                ...state,
                modalConfirmIsOpen: true,
                deleteNumber: action.payload,
            };

        case CLOSE_MODAL:
            return {
                ...state,
                modalConfirmIsOpen: false,
            };

        case OPEN_INPUT_MODAL:
            let orgAddFix: Array<IOrganization> = [{
                id: '',
                title: '',
                address: '',
                inn: '',
            }]; //багфикс. почему-то когда нет организаций. модальное окно добавления не работает

            if(state.organization.length === 0)
                return {
                    ...state,
                    ModalInputOrgIsOpen: true,
                    organization: orgAddFix,
                };

            else return {
                ...state,
                ModalInputOrgIsOpen: true,
            };

        case CLOSE_INPUT_MODAL:
            let closeInputModalState = {
                ...state,
                ModalInputOrgIsOpen: false,
                onChanged: false,
                deleteNumber: 0,
            };

            closeInputModalState.organization.map((org, index) => {
                if(closeInputModalState.organization[index].id === '' &&
                    closeInputModalState.organization[index].title === '' &&
                    closeInputModalState.organization[index].address === '' &&
                    closeInputModalState.organization[index].inn === ''
                )
                {
                    closeInputModalState.organization.splice(index, 1);
                }
            });

            return closeInputModalState;

        case SET_EDITED_ORGANIZATION:
            const organization: IOrganization = state.organization[action.payload];
            return {
                ...state,
                deleteNumber: action.payload,
                onChanged: true,
                orgEditId: organization.id,
                orgEditAddress: organization.address,
                orgEditTitle: organization.title,
                orgEditInn: organization.inn,
            };

        case CHANGE_MODAL_INPUT_ORGANIZATION:
            return {
                ...state,
                onChanged: !state.onChanged,
            };

        case CHANGE_TO_FALSE_MODAL_INPUT_ORGANIZATION:
            return {
                ...state,
                onChanged: false,
            };

        case REQUEST_ORGANIZATIONS:
            return {
                ...state,
                isOrganizationsLoading: true,
            };

        case RECEIVE_ORGANIZATIONS:
            return {
                ...state,
                isOrganizationsLoading: false,
                organization: action.payload,
            };

        case ORGANIZATION_ADDRESS_HANDLE_CHANGE:
            return {
                ...state,
                orgEditAddress: action.payload,
            };

        case ORGANIZATION_ID_HANDLE_CHANGE:
            return {
                ...state,
                orgEditId: action.payload,
            };

        case ORGANIZATION_TITLE_HANDLE_CHANGE:
            return {
                ...state,
                orgEditTitle: action.payload,
            };

        case ORGANIZATION_INN_HANDLE_CHANGE:
            return {
                ...state,
                orgEditInn: action.payload,
            };

        default: return state;
    }
}
