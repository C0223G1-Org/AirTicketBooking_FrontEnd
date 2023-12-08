import React, {useState} from "react";
import {Button, Modal} from "react-bootstrap";

function ModalDeleteTicket(props) {
    const {ticket, delete: deleteTicket, icon} = props;
    const [show, setShow] = useState(false)
    const [id, setID] = useState(null)
    const handleClose = () => setShow(false);
    const showModal = () => {
        setID(ticket.id)
        setShow(true);
    }
    return (
        <>
            <a
                onClick={showModal} className={icon.name}>

                <i className={icon} style={{color: '#eb0f1a'}}/>
            </a>

            <Modal className="ModalTicket" show={show} onHide={handleClose} id={id}>
                <Modal.Header className="header-modal" closeButton>
                    <Modal.Title>Xóa Vé</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <div>
                            <form>
                                <div className="modal-body">
                                    <p>Are you sure you want to delete these {ticket.name}</p>
                                    <p className="text-warning">
                                        <small style={{color: "red"}}>This action cannot be undone.</small>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button style={{backgroundColor: "red"}} onClick={() => deleteTicket(ticket.id)}>
                        Xóa
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalDeleteTicket;