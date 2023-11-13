import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const Update = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        age: ''
    })
    const { id } = useParams();

    const navigate = useNavigate()
    const inputEvent = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const updateUser = { name: user.name, email: user.email, age: user.age }
        await axios.patch(`http://localhost:8800/${id}`, updateUser);
        navigate('/all')
    }

    const loadUser = async () => {
        const result = await axios.get(`http://localhost:8800/${id}`)
        setUser(result.data)
    }
    useEffect(() => {
        loadUser()
    }, [])
    return (
        <Container>
            <Form className='w-75 mx-auto card p-4 mt-5' onSubmit={handleSubmit}>
                <h3 className='text-center'>Update data</h3>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Name" name="name" value={user.name} onChange={inputEvent} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="email" value={user.email} onChange={inputEvent} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Age</Form.Label>
                    <Form.Control type="number" placeholder="Age" name="age" value={user.age} onChange={inputEvent} />
                </Form.Group>

                <Button variant="primary" type="submit" className='mt-3'>
                    Submit
                </Button>
            </Form>
        </Container>
    )
}

export default Update