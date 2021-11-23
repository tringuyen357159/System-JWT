import React, { useState,useRef } from 'react';
import { Form } from 'react-bootstrap';


const SearchBlog = (props) => {
    const [search, setSerach] = useState('');
    const typingTimeOutRef = useRef(null);

    const handleOnChange = (e) => {
        const value = e.target.value; 
        setSerach(value)

        if(typingTimeOutRef.current) {
            clearTimeout(typingTimeOutRef.current)
        };

        typingTimeOutRef.current = setTimeout(() => {
            const formValues = {
                search: value
            }
            props.handleSearch(formValues);
        }, 300);
    }

    return (
        <Form>
            <Form.Group>
                <Form.Control
                    value={search} 
                    placeholder="Tìm kiếm..."
                    type="text"
                    onChange={handleOnChange}
                />
            </Form.Group>
        </Form>
    )
}

export default SearchBlog
