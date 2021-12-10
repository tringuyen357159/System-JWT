import React, { useState, useEffect } from 'react'
import { Col, Container, Row, Spinner, Button } from 'react-bootstrap';
import NavbarMenu from '../NavbarMenu/NavbarMenu'
import { DataGrid } from "@material-ui/data-grid";
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch, useSelector } from "react-redux";
import { deleteStudentSuccess, getAllStudentSuccess, createStudentApiSuccess, updateStudentApiSuccess } from '../../../actions/studentApiAction';
import EditIcon from '@material-ui/icons/Edit';
import ModalEditStudentApi from './modal/ModalEditStudentApi';
import AddIcon from '@material-ui/icons/Add';
import ModalAddStudentApi from './modal/ModalAddStudentApi';
import { emitter } from '../../../utils/emitter';

export const StudentAPI = () => {
    const students = useSelector((state) => state.student.students);
    const isloading = useSelector((state) => state.student.isLoading);
    const dispatch = useDispatch();
    const [isOpenEditModal, setIsOpenEditModal] = useState(false);
    const [isOpen, setIsOpen] = useState(false)
    const [studentEdit, setStudentEdit] = useState({})

    useEffect(() => {
    
        dispatch(getAllStudentSuccess());

    }, [dispatch])


    const handleDeleteStudent = (id) => {
        dispatch(deleteStudentSuccess(id))
    }

    const handleToggleModalEdit = () => {
        setIsOpenEditModal(!isOpenEditModal)
    }

    const handleEditStudent = (data) => {
        setStudentEdit(data)
        setIsOpenEditModal(true)
    }

    const handleModalCreateUser = () => {
        setIsOpen(true)
    }

    const handleToggleModal = () => {
        setIsOpen(!isOpen)
    }

    const columns = [
        {   field: "_id", 
            headerName: "ID", 
            width: 250 
        },
        {
            field: "name",
            headerName: "Name",
            width: 200,
        },
        {   
            field: "age", 
            headerName: "Age", 
            width: 120 
        },
        {
            field: "mark",
            headerName: "Mark",
            width: 160,
        },
        {
            field: "city",
            headerName: "City",
            width: 160,
        },
        {
            field: "gender",
            headerName: "Gender",
            width: 160,
            renderCell: (params) => {
                return (
                   params.row.gender === true ? 'Male' : 'Female'
                );
            },
        },
        {
            field: "action",
            headerName: "Action",
            width: 190,
            renderCell: (params) => {
                return (
                    <>
                        <EditIcon
                            style={{cursor: 'pointer', color: '#2eb85c', marginRight: '10px'}}
                            onClick={() => handleEditStudent(params.row)}
                        /> 

                        <DeleteIcon
                            style={{cursor: 'pointer', color: '#e55353'}}
                            onClick={() => { if (window.confirm('Are you sure wish to delete this student?')) handleDeleteStudent(params.row._id) }}
                        />
                    </>
                );
            },
        },
    ]  

    const handleCreateStudent = (data) => {
        if(data){
            dispatch(createStudentApiSuccess(data))
        }
    }

    const handleUpdateStudent = (data) => {
        if(data) {
            dispatch(updateStudentApiSuccess(data))
            handleToggleModalEdit()
        }
    }

    return (
        <>
            <NavbarMenu />
            {isloading === true 
            ?
                <div className="spinner">
                    <div className="spinner-container">
                        <Spinner animation="border" variant="info" />
                    </div>
                </div>
            :
            <Container style={{ height: "75vh" }}>
                <Row>
                    <Col 
                        md="12" 
                        className="mt-3 mb-3" 
                        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}
                    >
                        <h2 
                            className="text-center"
                            style={{color: '#3498db'}}
                        >MANAGE STUDENT</h2>
                        <Button 
                            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}
                            onClick={handleModalCreateUser}
                        > 
                            <AddIcon />
                            Create
                        </Button>
                    </Col>
                </Row>
                <DataGrid
                    rows={students}
                    disableSelectionOnClick
                    columns={columns}
                    rowsPerPageOptions={[5, 10, 20]}
                    pageSize={8}
                    checkboxSelection
                    getRowId={(row) => row._id}
                />
            </Container>
            }
            <ModalAddStudentApi 
                isOpen={isOpen}
                handleToggleModal={handleToggleModal}
                handleCreateStudent={handleCreateStudent}
            />
            {
                isOpenEditModal && 
                <ModalEditStudentApi 
                    isOpenEditModal={isOpenEditModal}
                    studentEdit={studentEdit}
                    handleToggleModalEdit={handleToggleModalEdit}
                    handleUpdateStudent={handleUpdateStudent}
                />
            }
        </>
    )
}
