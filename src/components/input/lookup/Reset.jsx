import React from 'react';
import {Modal, Button} from 'react-bootstrap';

const Reset = (props) => {
  const {show, toggle} = props;

  return (
    <Modal
          show={show}
          onHide={toggle}
          container={this}
          aria-labelledby="contained-modal-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">Reset Form</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Input data has been cleared from your browser cache!
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={toggle}>Close</Button>
          </Modal.Footer>
        </Modal>
  );
}

export default Reset;
