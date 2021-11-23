import React, { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { updateStudentSuccess } from '../../../actions/studentAction';
import { toast } from 'react-toastify';

const ModalEditStudent = (props) => {
    const studentList = useSelector(state => state.studentList)
    const [updateStudent, setUpdateStudent] = useState({
        name: '',
        mark: '',
        age: '',
        city: '',
        gender: '',
        id: ''
    })
    const dispatch = useDispatch()
    
    const handleOnChange = (e) => {
        setUpdateStudent({
            ...updateStudent,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        if(props.studentEdit) {
            setUpdateStudent({
                name: props.studentEdit.name,
                mark: props.studentEdit.mark,
                age: props.studentEdit.age,
                city: props.studentEdit.city,
                gender: props.studentEdit.gender,
                id: props.studentEdit.id,
            });
        }
    }, [])

    const handleUpdateStudent = () => {
        dispatch(updateStudentSuccess(updateStudent))
        setUpdateStudent({
            name: '',
            mark: '',
            age: '',
            city: '',
            gender: ''
        })
        props.handleToggleModalEdit();
        toast.success("Update student successfully!");
    }

    return (
        <Modal show={props.isOpenEditModal} animation={true} onHide={props.handleToggleModalEdit} centered>
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
                        value={updateStudent.name}
                        onChange={handleOnChange}
                    />
                </Form.Group>
                <Form.Group className="my-3">
                    <Form.Control 
                        type="text" 
                        placeholder="Mark" 
                        name="mark" 
                        value={updateStudent.mark}
                        onChange={handleOnChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control 
                        type="text" 
                        placeholder="Age" 
                        name="age" 
                        value={updateStudent.age}
                        onChange={handleOnChange}
                    />
                </Form.Group>
                <Form.Select 
                    aria-label="Default select example" 
                    className="my-3"  
                    onChange={handleOnChange}
                    value={updateStudent.city}
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
                        checked={updateStudent.gender === 'male' ? true : false}
                    />
                    <Form.Check 
                        inline
                        type="radio" 
                        name="gender" 
                        label="Female"
                        value="female"
                        onChange={handleOnChange}
                        checked={updateStudent.gender === 'female' ? true : false}
                    />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleToggleModalEdit}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleUpdateStudent}>
                    Update 
                </Button>   
            </Modal.Footer>
        </Modal>
    )
}

export default ModalEditStudent
