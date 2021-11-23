import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { createNewStudentSuccess } from '../../../actions/studentAction';
import { toast } from 'react-toastify';
import { emitter } from '../../../utils/emitter';

const ModalAddStudent = (props) => {
    const studentList = useSelector(state => state.studentList)
    const [newStudent, setNewStudent] = useState({
        name: '',
        mark: '',
        age: '',
        city: '',
        gender: ''
    })
    const dispatch = useDispatch();

    const listenToEmitter = () => {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            setNewStudent({
                name: '',
                mark: '',
                age: '',
                city: '',
                gender: ''
            })
        })
    }

    const handleCloseModal = () => {
        listenToEmitter();
        props.handleToggleModal();
    }


    const handleOnChange = (e) => {
        setNewStudent({
            ...newStudent,
            [e.target.name]: e.target.value
        })
    }

    const handleCreateStudent = () => {
        dispatch(createNewStudentSuccess(newStudent))
        setNewStudent({
            name: '',
            mark: '',
            age: '',
            city: '',
            gender: ''
        })
        props.handleToggleModal();
        toast.success("Create student successfully!");
    }

    return (
        <Modal show={props.isOpen} animation={true} onHide={handleCloseModal} centered>
            <Modal.Header closeButton>
                <Modal.Title>CREATE STUDENT</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group>
                    <Form.Control 
                        type="text" 
                        placeholder="Name" 
                        name="name" 
                        required
                        value={newStudent.name}
                        onChange={handleOnChange}
                    />
                </Form.Group>
                <Form.Group className="my-3">
                    <Form.Control 
                        type="text" 
                        placeholder="Mark" 
                        name="mark" 
                        value={newStudent.mark}
                        onChange={handleOnChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control 
                        type="text" 
                        placeholder="Age" 
                        name="age" 
                        value={newStudent.age}
                        onChange={handleOnChange}
                    />
                </Form.Group>
                <Form.Select 
                    aria-label="Default select example" 
                    className="my-3"  
                    onChange={handleOnChange}
                    value={newStudent.city}
                    name="city"
                >
                    <option value="">Choose City</option>
                    {studentList.cityList && studentList.cityList.length > 0 &&
                        studentList.cityList.map((item, index) => {
                            return (
                                <option 
                                    value={item.code}
                                    name="city"
                                    key={index}
                                >
                                    {item.name}
                                </option>
                            )
                        })
                    }
                </Form.Select>
                <Form.Group>
                    <Form.Check 
                        inline
                        type="radio" 
                        name="gender" 
                        label="Male"
                        value="male"
                        onChange={handleOnChange}
                    />
                    <Form.Check 
                        inline
                        type="radio" 
                        name="gender" 
                        label="Female"
                        value="female"
                        onChange={handleOnChange}
                    />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleCreateStudent}>
                    Save 
                </Button>   
            </Modal.Footer>
        </Modal>
    )
}

export default ModalAddStudent
