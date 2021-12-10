import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import  './Modal.scss'

const ModalAddStudentApi = (props) => {
    const { register, handleSubmit, formState: { errors }, clearErrors, setValue  } = useForm();

    const handleCloseModal = () => {
        props.handleToggleModal();
        clearErrors(["name", "age", "mark", "city", "gender"]);
        setValue("name", "")
        setValue("age", "")
        setValue("mark", "")
        setValue("city", "")
        setValue("gender", "")
    }

    const onSubmit = (data) => {
        props.handleCreateStudent(data)
        handleCloseModal()
    }
   

    return (
        <Modal show={props.isOpen} animation={true} onHide={handleCloseModal} centered>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Modal.Header closeButton>
                    <Modal.Title>CREATE STUDENT</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <input
                            type="text"
                            name="name"
                            id="name"
                            className={errors.name?.type ? "customInput active" : 'customInput'}
                            placeholder="Your Name"
                            {...register("name", {
                                required: true,
                            })}
                        />
                        {errors.name?.type === "required" && <span>Name is required</span>}
                    </div>
                    <div className="form-group my-3">
                        <input
                            type="text"
                            name="age"
                            id="age"
                            className={errors.age?.type ? "customInput active" : 'customInput'}
                            placeholder="Your Age"
                            {...register("age", {
                                required: true,
                                pattern: /^(\d{1,2})$/,
                            })}
                        />
                        {errors.age?.type === "required" && <span>Age is required</span>}
                        {errors.age?.type === "pattern" && <span>Invalid age</span>}
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            name="mark"
                            id="mark"
                            className={errors.mark?.type ? "customInput active" : 'customInput'}
                            placeholder="Your Mark"
                            {...register("mark", {
                                required: true,
                                pattern: /^(\d{1,2}(\.\d{1,2})?)$/,
                            })}
                        />
                        {errors.mark?.type === "required" && <span>Mark is required</span>}
                        {errors.mark?.type === "pattern" && <span>Invalid mark</span>}
                    </div>
                    <div className="form-group my-3">
                        <input
                            type="text"
                            name="city"
                            id="city"
                            className={errors.city?.type ? "customInput active" : 'customInput'}
                            placeholder="Your City"
                            {...register("city", {
                                required: true,
                            })}
                        />
                        {errors.city?.type === "required" && <span>City is required</span>}
                    </div>
                    <div className="form-group" >
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <div style={{display: 'flex', alignItems: 'center', marginRight: '20px'}}>
                                <input
                                    type="radio"
                                    name="gender"
                                    id="gender"
                                    value="true"
                                    {...register("gender", {
                                        required: true,
                                    })}
                                /> <p>Male</p>
                            </div>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <input
                                    type="radio"
                                    name="gender"
                                    id="gender"
                                    value="false"
                                    {...register("gender", {
                                        required: true,
                                    })}
                                /> <p>Female</p>
                            </div>
                        </div>
                        {errors.gender?.type === "required" && <span>Gender is required</span>}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit">
                        Save 
                    </Button>   
                </Modal.Footer>
            </form>
        </Modal>
    )
}

export default ModalAddStudentApi
