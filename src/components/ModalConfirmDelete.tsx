import * as React from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};


Modal.setAppElement("#root");

interface IModalConfirmDelete {
    modalIsOpen: boolean;
    closeModal: () => void;
    title: string;
    handleDeleteOrg: (e: React.MouseEvent) => void;
    deleteNumber: number;
}

export default class ModalConfirmDelete extends React.Component<IModalConfirmDelete, {}> {
  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.modalIsOpen}
          onRequestClose={this.props.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <p
            className="text-center"
          >
            Do you want delete {this.props.title} element?
          </p>
          <div className="d-flex justify-content-around">
            <button onClick={this.props.handleDeleteOrg} className="col-3">
              ok
            </button>
            <button onClick={this.props.closeModal}>cancel</button>
          </div>
        </Modal>
      </div>
    );
  }
}
