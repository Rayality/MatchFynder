import { useDispatch, useSelector } from "react-redux";
import CreateAccountForm from "./CreateAccount";
import LoginForm from "./Login";
import { clicked, shown } from "../../Redux/modal-slice";
import { Modal, Form } from "react-bootstrap";

export default function ModalForm() {
  const invoked = useSelector((state) => state.modalCheck.value);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(clicked());
  };

  const initModal = () => {
    dispatch(shown());
  };

  const formSwitch = () => {
    if (invoked.isSwitched) {
      return <CreateAccountForm />;
    } else {
      return <LoginForm />;
    }
  };

  return (
    <Modal variant='primary' show={invoked.isShown} onHide={initModal}>
      <Modal.Header closeButton>
        <Modal.Title>
          Login or Sign Up!{" "}
          <Form.Check onClick={handleClick} type='switch' id='form-toggle' />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{formSwitch()}</Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
}
