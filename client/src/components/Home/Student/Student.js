import React, { useEffect, useState } from 'react'
import NavbarMenu from '../NavbarMenu/NavbarMenu';
import queryString from 'query-string';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { deleteStudentSuccess, fetchCitySuccess, fetchStudentSuccess } from '../../../actions/studentAction';
import { Container, Table, Button, Row, Col, Spinner } from 'react-bootstrap';
import SearchBlog from '../SearchBlog/SearchBlog';
import Pagination from '../Pagination/Pagination';
import ModalAddStudent from '../Modal/ModalAddStudent';
import ModalEditStudent from '../Modal/ModalEditStudent';
import { emitter } from '../../../utils/emitter';
import StudentFilterCity from './StudentFilterCity';
import StudentFilterMark from './StudentFilterMark';


const Student = () => {
    const [filters, setFilters] = useState({
        _limit: 10,
        _page: 1
    })
    const [pagination, setPagination] = useState({
        _page: 1,
        _limit: 10,
        _totalRows: 1,
    });
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenEditModal, setIsOpenEditModal] = useState(false)
    const dispatch = useDispatch()
    const studentList = useSelector(state => state.studentList);
    const [isloading, setIsLoading] = useState(true);
    const [studentEdit, setStudentEdit] = useState({})

    useEffect(() => {
        const fetchStudentList = async () => {
            try {
                const paramString = queryString.stringify(filters);
                const res = await axios.get(`http://js-post-api.herokuapp.com/api/students?${paramString}`);
                if(res) {
                    dispatch(fetchStudentSuccess(res.data.data))
                    setIsLoading(false)
                    setPagination(res.data.pagination);
                }
            } catch (error) {
                
            }
        }
        fetchStudentList()
    }, [filters])

    useEffect(() => {
        const fetchCityList = async () => {
            try {
                const res = await axios.get(`http://js-post-api.herokuapp.com/api/cities?`);
                if(res) {
                    dispatch(fetchCitySuccess(res.data))
                }
            } catch (error) {
                
            }
        }

        fetchCityList();
    },[])

    const handleSearchStudent = (data) => {
        setFilters({
            ...filters,
            _page: 1,
            name_like: data.search
        })
    }

    const onPageChange = (newPage) => {
        setFilters({
            ...filters,
            _page: newPage
        })
    }

    const handleModalCreateUser = () => {
        setIsOpen(true)
    }

    const handleToggleModal = () => {
        setIsOpen(!isOpen)
        emitter.emit('EVENT_CLEAR_MODAL_DATA');
    }

    const handleDeleteStudent = (id) => {
        dispatch(deleteStudentSuccess(id))
    }

    const handleEditStudent = (data) => {
        setStudentEdit(data)
        setIsOpenEditModal(true)
    }

    const handleToggleModalEdit = () => {
        setIsOpenEditModal(!isOpenEditModal)
    }

    const handleFilterByCity = (data) => {
        setFilters({
            ...filters,
            _page: 1,
            city: data.city
        })
    }

    const handleFilterByMark = (data) => {
        setFilters({
            ...filters,
            _page: 1,
            _sort: data.mark,
            _order: data.order
        })
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
            <Container>
                <Row>
                    <Col md="12" className="mt-3">
                        <h2 className="text-center">MANAGE STUDENT</h2>
                    </Col>
                </Row>
                <Row className="my-4">
                    <Col md="5">
                        <SearchBlog handleSearch={handleSearchStudent} />
                    </Col>
                    <Col md="3">
                        <StudentFilterCity handleFilterByCity= {handleFilterByCity} />
                    </Col>
                    <Col md="3">
                        <StudentFilterMark handleFilterByMark= {handleFilterByMark} />
                    </Col>
                    <Col md="1">
                        <Button
                            onClick={handleModalCreateUser}
                        >
                            Create
                        </Button>
                    </Col>
                </Row>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Gender</th>
                            <th>Mark</th>
                            <th>City</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {studentList.studentList && studentList.studentList.length > 0 &&
                            studentList.studentList.map((item, index) => {
                                return (
                                    <tr key={item.id}>
                                        <td>{index + 1}</td>
                                        <td>{item.name}</td>
                                        <td>{item.age}</td>
                                        <td>{item.gender}</td>
                                        <td>{item.mark}</td>
                                        <td>
                                            {
                                                studentList.cityList && studentList.cityList.length > 0 &&
                                                studentList.cityList.map(city => city.code === item.city ? city.name : '')
                                            }
                                        </td>
                                        <td>
                                            <Button 
                                                variant="warning" 
                                                className="mx-3"
                                                onClick={() => handleEditStudent(item)} 
                                            >
                                                Edit
                                            </Button>
                                            <Button 
                                                variant="danger"
                                                onClick={() => { if (window.confirm('Are you sure wish to delete this student?')) handleDeleteStudent(item.id) }}
                                            >
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
                <div className="justify-content-center" style={{display: 'flex'}}>
                    <Pagination pagination={pagination} onPageChange={onPageChange} />
                </div>
            </Container>
            }
            <ModalAddStudent 
                isOpen={isOpen}
                handleToggleModal={handleToggleModal}
            />
            {
                isOpenEditModal && 
                <ModalEditStudent 
                    isOpenEditModal={isOpenEditModal}
                    studentEdit={studentEdit}
                    handleToggleModalEdit={handleToggleModalEdit}
                />
            }
        </>
    )
}

export default Student
