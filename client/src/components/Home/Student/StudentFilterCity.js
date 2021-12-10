import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const StudentFilterCity = (props) => {
    const studentList = useSelector(state => state.studentList);
    const [city, setCity] = useState('')

    const handleOnChange = (e) => {
        const value = e.target.value; 
        setCity(value)

        const formValues = {
            city: value || undefined
        }
        props.handleFilterByCity(formValues)
    }
    return (
        <Form.Select 
            aria-label="Default select example" 
            onChange={handleOnChange}
            value={city}
            name="city"
        >
            <option value="" disabled selected>Filter by city</option>
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
    )
}

export default StudentFilterCity
