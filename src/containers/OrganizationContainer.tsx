import * as React from "react";
import { connect } from "react-redux";
import {
    addOrganization, changeModalInputOrg, changeToFalseModalInputOrg,
    closeInputModal,
    closeModal, fetchOrganizations,
    openInputModal,
    openModal,
    setEditedOrganization
} from "../actions/actions";
import { deleteOrganization } from "../actions/actions";
import { changeOrganization } from "../actions/actions";
import { logOut } from "../actions/actions";
import OrganizationComponent from '../components/OrganizationComponent';
import {Dispatch} from "redux";
import {IDispatch, IStore} from "../helpers/Interfaces";

const mapStateToProps = (state: IStore) => {
    return {
        organization: state.orgReducer.organization,
        modalConfirmIsOpen: state.orgReducer.modalConfirmIsOpen,
        ModalInputOrgIsOpen: state.orgReducer.ModalInputOrgIsOpen,
        deleteNumber: state.orgReducer.deleteNumber,
        onChanged: state.orgReducer.onChanged,
        user: state.loginReducer.user,
    };
};

function mapDispatchToProps(dispatch: IDispatch<IStore>) {
    return {
        addOrg: () => dispatch(addOrganization()),
        delOrg: () => dispatch(deleteOrganization()),
        changeOrg: () => dispatch(changeOrganization()),
        logOut: () => dispatch(logOut()),
        openModal: (id: number) => dispatch(openModal(id)),
        closeModal: () => dispatch(closeModal()),
        openInputModal: () => dispatch(openInputModal()),
        closeInputModal: () => dispatch(closeInputModal()),
        setEditedOrganization: (id: number) => dispatch(setEditedOrganization(id)),
        changeModalInputOrg: () => dispatch(changeModalInputOrg()),
        changeToFalseModalInputOrg: () => dispatch(changeToFalseModalInputOrg()),
        fetchOrganizations: () => dispatch(fetchOrganizations()),
    };
}

const OrganizationContainer =  connect(
    mapStateToProps,
    mapDispatchToProps
)(OrganizationComponent);

export default OrganizationContainer;