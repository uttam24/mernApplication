import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const Read = () => {
    const [data, setData] = useState([])
    const getApi = async () => {

        let getData = await axios.get('http://localhost:8800')
        let data = await getData.data
        setData(data)
    }
    const deleteItem = async (id) => {
        await axios.delete(`http://localhost:8800/${id}`)
        getApi()
    }

    useEffect(() => {
        getApi()
    }, [])
    return (
        <Container className='mt-5'>
            <Row >
                {data.map((item) => (
                    <Col md={3} className='mb-5'>
                        <Card key={item._id}>
                            <Card.Body>
                                <Card.Title>{item.name}</Card.Title>
                                <Card.Text>
                                    {item.email}
                                </Card.Text>
                                <Card.Text>
                                    {item.age}
                                </Card.Text>
                                <Link variant="primary" to={`/${item._id}`} className='me-2 btn btn-primary'>Edit</Link>
                                <Button variant="primary" onClick={() => { deleteItem(item._id) }}>Delete</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}

export default Read