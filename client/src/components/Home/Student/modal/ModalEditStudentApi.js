import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import  './Modal.scss'

const ModalEditStudentApi = (props) => {
    const { register, handleSubmit, formState: { errors }, getValues, setValue  } = useForm();
    const [gender, setGender] = useState('');

    const handleOnChange = (e) => {
        setGender(e.target.value)
        setValue("gender", e.target.value)
    }

    useEffect(() => {
        if(props.studentEdit) {
            setValue("name", props.studentEdit.name)
            setValue("age", props.studentEdit.age)
            setValue("mark", props.studentEdit.mark)
            setValue("city", props.studentEdit.city)
            setValue("gender", props.studentEdit.gender)
            setValue("_id", props.studentEdit._id)
            const value = getValues('gender'); 
            setGender(value)
        }
    }, [])

    const onSubmit = (data) => {
        props.handleUpdateStudent(data)
    }

    return ( 
        <Modal show={props.isOpenEditModal} animation={true} onHide={props.handleToggleModalEdit} centered>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Modal.Header closeButton>
                    <Modal.Title>EDIT STUDENT</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input
                        hidden
                        type="text"
                        name="_id"
                        id="_id"
                        {...register("_id", {
                            required: true,
                        })}
                    />
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
                                    onChange={handleOnChange}
                                    checked={gender === true ||  gender === 'true' ? 'checked' : ''}
                                /> <p>Male</p>
                            </div>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <input
                                    type="radio"
                                    name="gender"
                                    id="gender"
                                    value="false"
                                    onChange={handleOnChange}
                                    checked={gender === false ||  gender === 'false' ? 'checked' : ''}
                                /> <p>Female</p>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleToggleModalEdit}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit">
                        Update 
                    </Button>   
                </Modal.Footer>
            </form>
        </Modal>
    )
}

export default ModalEditStudentApi
