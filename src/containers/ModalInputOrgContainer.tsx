import * as React from "react";
import { connect } from "react-redux";
import {
    addOrganization, changeModalInputOrg, changeToFalseModalInputOrg,
    closeInputModal,
    closeModal, fetchOrganizations,
    openInputModal,
    openModal, orgAddressHandleChange, orgIdHandleChange, orgInnHandleChange, orgTitleHandleChange,
    setEditedOrganization
} from "../actions/actions";
import { deleteOrganization } from "../actions/actions";
import { changeOrganization } from "../actions/actions";
import ModalInputOrgComponent from "../components/ModalInputOrgComponent";
import {Dispatch} from "redux";
import {ChangeEvent} from "react";
import {IDispatch, IStore} from "../helpers/Interfaces";

const mapStateToProps = (state: IStore) => {
    return {
        organization: state.orgReducer.organization,
        modalConfirmIsOpen: state.orgReducer.modalConfirmIsOpen,
        ModalInputOrgIsOpen: state.orgReducer.ModalInputOrgIsOpen,
        deleteNumber: state.orgReducer.deleteNumber,
        onChanged: state.orgReducer.onChanged,
        user: state.loginReducer.user,
        orgEditAddress: state.orgReducer.orgEditAddress,
        orgEditId: state.orgReducer.orgEditId,
        orgEditTitle: state.orgReducer.orgEditTitle,
        orgEditInn: state.orgReducer.orgEditInn,
    };
};

function mapDispatchToProps(dispatch: IDispatch<IStore>) {
    return {
        addOrg: () => dispatch(addOrganization()),
        delOrg: () => dispatch(deleteOrganization()),
        changeOrg: () => dispatch(changeOrganization()),
        openInputModal: () => dispatch(openInputModal()),
        closeInputModal: () => dispatch(closeInputModal()),
        setEditedOrganization: (id: number) => dispatch(setEditedOrganization(id)),
        changeModalInputOrg: () => dispatch(changeModalInputOrg()),
        changeToFalseModalInputOrg: () => dispatch(changeToFalseModalInputOrg()),
        fetchOrganizations: () => dispatch(fetchOrganizations()),
        orgTitleHandleChange: (e: ChangeEvent<HTMLInputElement>) => dispatch(orgTitleHandleChange(e)),
        orgIdHandleChange: (e: ChangeEvent<HTMLInputElement>) => dispatch(orgIdHandleChange(e)),
        orgAddressHandleChange: (e: ChangeEvent<HTMLInputElement>) => dispatch(orgAddressHandleChange(e)),
        orgInnHandleChange: (e: ChangeEvent<HTMLInputElement>) => dispatch(orgInnHandleChange(e)),
        closeModal: () => dispatch(closeModal()),
        changeFalse: () => dispatch(changeToFalseModalInputOrg()),
    };
}

const ModalInputOrgContainer =  connect(
    mapStateToProps,
    mapDispatchToProps
)(ModalInputOrgComponent);

export default ModalInputOrgContainer;