import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

const StudentFilterMark = (props) => {
    const [mark, setMark] = useState('')

    const handleOnChange = (e) => {
        const value = e.target.value; 
        const sort = value.split('.')
        setMark(value)

        const formValues = {
            mark: sort[0] || undefined,
            order: sort[1] || undefined
        }
        props.handleFilterByMark(formValues)
    }

    return (
        <Form.Select 
            aria-label="Default select example" 
            onChange={handleOnChange}
            value={mark}
            name="city"
        >
            <option value="" disabled selected>No sort</option>
            <option value="mark.asc">Mark ASC</option>
            <option value="mark.desc">Mark DESC</option>
        </Form.Select>
    )
}

export default StudentFilterMark
