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

interface IModalInputOrgComponent {
    addOrg: () => void;
    closeInputModal: () => void;
    changeFalse: () => void;
    changeOrg: () => void;
    ModalInputOrgIsOpen: boolean;
    onChanged: boolean;
    orgEditId: string;
    orgEditTitle: string;
    orgEditAddress: string;
    orgEditInn: string;
    orgIdHandleChange: (e:React.ChangeEvent<HTMLInputElement>) => void;
    orgTitleHandleChange: (e:React.ChangeEvent<HTMLInputElement>) => void;
    orgAddressHandleChange: (e:React.ChangeEvent<HTMLInputElement>) => void;
    orgInnHandleChange: (e:React.ChangeEvent<HTMLInputElement>) => void;

}

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");


export default class ModalInputOrgComponent extends React.Component<IModalInputOrgComponent, {}> {
  addInfo()
  {
    this.props.addOrg();
    this.props.closeInputModal();
    this.props.changeFalse();
  }

  handleChangeOrg() {
    this.props.changeOrg();
    this.props.closeInputModal();
    this.props.changeFalse();
  }

  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.ModalInputOrgIsOpen}
          onRequestClose={() => this.props.closeInputModal()}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="col-12">
            <label className="">
              ID
              <br />
              <input
                defaultValue={!this.props.onChanged ? undefined : this.props.orgEditId}
                type="text"
                name="id"
                onChange={(e) => this.props.orgIdHandleChange(e)}
              />
            </label>
            <label className="">
              Title
              <br />
              <input
                defaultValue={!this.props.onChanged ? undefined : this.props.orgEditTitle}
                type="text"
                name="title"
                onChange={(e) => this.props.orgTitleHandleChange(e)}
              />
            </label>
            <label className="">
              Adress
              <br />
              <input
                defaultValue={!this.props.onChanged ? undefined : this.props.orgEditAddress}
                type="text"
                name="address"
                onChange={(e) => this.props.orgAddressHandleChange(e)}
              />
            </label>
            <label className="">
              INN
              <br />
              <input
                defaultValue={!this.props.onChanged ? undefined : this.props.orgEditInn}
                type="text"
                name="inn"
                onChange={(e) => this.props.orgInnHandleChange(e)}
              />
            </label>
            <input
              type="submit"
              value="Submit"
              style={this.props.onChanged ? { display: "none" } : undefined}
              onClick={() => this.addInfo()}
            />
            <input
              type="submit"
              value="Change"
              style={!this.props.onChanged ? { display: "none" } : undefined}
              onClick={() => this.handleChangeOrg()}
            />
          </div>
        </Modal>
      </div>
    );
  }
}
