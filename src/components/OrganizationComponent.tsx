import * as React from "react";
import ModalConfirmDelete from "./ModalConfirmDelete";
import {getCookie} from "../helpers/cookies";
import {Redirect} from "react-router-dom";
import ModalInputOrgContainer from "../containers/ModalInputOrgContainer";
import {IOrganization} from '../helpers/Interfaces';

interface IOrganizationComponent {
    changeToFalseModalInputOrg: () => void;
    fetchOrganizations: () => void;
    changeModalInputOrg: () => void;
    closeInputModal: () => void;
    openInputModal: () => void;
    closeModal: () => void;
    addOrg: () => void;
    delOrg: () => void;
    organization: Array<IOrganization>;
    modalConfirmIsOpen: boolean;
    deleteNumber: number;
    setEditedOrganization: (number:number) => void;
    logOut: () => void;
    openModal: (id:number) => void;
}

export class OrganizationComponent extends React.Component<IOrganizationComponent, {}> {
    changeFalse = () => {
        this.props.changeToFalseModalInputOrg();
    };

    componentWillMount()
    {
        this.props.fetchOrganizations();
    }

    renderDeleteModal = () =>
    {
        if(Object.keys(this.props.organization).length > 0)
        {
            return (
                <ModalConfirmDelete
                    modalIsOpen={this.props.modalConfirmIsOpen}
                    closeModal={() => this.closeModal()}
                    handleDeleteOrg={this.handleDeleteOrg}
                    deleteNumber={this.props.deleteNumber}
                    title={
                        this.props.organization.length > 0
                            ? this.props.organization[this.props.deleteNumber].title
                            : "Org"
                    }
                />
            );
        }

        return null;
    };

    renderEditModal = () =>
    {
        if(Object.keys(this.props.organization).length > 0)
        {
            return <ModalInputOrgContainer/>
        }

        return null;
    };


    logout = () =>
    {
        this.props.logOut();
        window.location.reload();
    };

    change() {
        this.props.changeModalInputOrg();
    }

    changeStart = (number: number) =>
    {
        this.props.setEditedOrganization(number);
        this.openInputModal();
    };

    closeInputModal = () => {
        this.props.closeInputModal();
    };

    openInputModal = () => {
        this.props.openInputModal();
    };

    openModal = (id: number) => {
        this.props.openModal(id);
    };

    closeModal = () => {
        this.props.closeModal();
    };

    handleAddOrg = () => {
        this.props.addOrg();
    };

    handleDeleteOrg = () => {
        this.closeModal();
        this.props.delOrg();
    };

    render() {
        let userCookie = getCookie('user');
        if(!(userCookie && Object.keys(userCookie).length > 0)) {
            return <Redirect to={"/"}/>
        }

        return (
            <div>
                <header>
                    <div className="container">
                        <div className="row">
                            <h1 className="mx-auto mt-5 pl-5">Organization</h1>
                            <button
                                type="button"
                                className="btn btn-danger mr-5 py-2"
                                style={{
                                    height: "3rem",
                                    marginTop: "3rem",
                                    marginLeft: "-5rem"
                                }}
                                title="Exit"
                                onClick={() => this.logout()}
                            >
                                LogOut
                            </button>
                        </div>
                    </div>
                </header>
                <main>
                    <div className="container">
                        <table className="table table-striped mt-4">
                            <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Title</th>
                                <th scope="col">Adress</th>
                                <th scope="col">INN</th>
                                <th scope="col" />
                            </tr>
                            </thead>
                            <tbody>
                            {this.props.organization.map((item, index) => {
                                return (
                                    <tr key={item.id}>
                                        <th scope="row">{item.id}</th>
                                        <td>{item.title}</td>
                                        <td>{item.address}</td>
                                        <td>{item.inn}</td>
                                        <td>
                                            <button
                                                type="button"
                                                className="btn btn-outline-primary"
                                                onClick={() => this.changeStart(index)}
                                            >
                                                Change
                                            </button>
                                            <button
                                                id={String(index)}
                                                type="button"
                                                className="btn btn-outline-danger mx-2"
                                                onClick={() => this.openModal(index)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                        <button
                            type="button"
                            className="btn btn-success mt-3 float-right"
                            style={{ marginRight: "17%" }}
                            // onClick={this.handleAddOrg}
                            onClick={this.openInputModal}
                        >
                            Add Organization
                        </button>
                    </div>
                </main>
                {this.renderDeleteModal()}
                {this.renderEditModal()}
            </div>
        );
    }
}

export default OrganizationComponent;