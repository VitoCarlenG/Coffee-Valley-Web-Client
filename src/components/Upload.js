import { Nav, Card, Table, Button, Form, InputGroup } from 'react-bootstrap';
import '../App.css';
import React, { useState, useEffect } from "react";
import cv from '../assets/cv.png'
import moment from "moment"
import axios from 'axios';
import Swal from 'sweetalert2'

const Upload = () => {

    const [uploads, setUploads] = useState([])
    const [uploadTitle, setUploadTitle] = useState("")
    const [uploadFile, setUploadFile] = useState([])
    const [uploadAuthor, setUploadAuthor] = useState("")

    const currentDate = moment().format('LL');

    const getUploads = () => {
        axios.get(`http://localhost:3001/uploads`)
          .then(async res => {
            setUploads(await res.data)
          })
    }

    const submitUpload = (e) => {
        e.preventDefault()

        const formData = new FormData();
        formData.append('title', uploadTitle);
        formData.append('file', uploadFile[0]);
        formData.append('author', uploadAuthor);

        axios.post(`http://localhost:3001/upload`, formData, {
            
        })
        .then(async res => {
            await Swal.fire(res.data.message);
            window.location.replace('/upload');
        })
    }

    const logout = async (e) => {
        e.preventDefault()

        sessionStorage.removeItem('id');

        await Swal.fire("Logout Success");
        
        window.location.replace('/login');
    }

    useEffect(() => {
        getUploads();
    }, [])

    return (
        <div className="App">
      <header>
        <img src={cv} className="App-logo" alt="logo" />
        <h1>Coffee Valley</h1>
        <br/>
        <Card>
        <Card.Header>
            <Nav variant="tabs" defaultActiveKey="Upload">
            <Nav.Item>
                <Nav.Link href="/">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/catalog">Catalog</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/distributor">Distributor</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/upload">Upload</Nav.Link>
            </Nav.Item>
            </Nav>
        </Card.Header>
        <Card.Body>
            <Form onSubmit={submitUpload}>
                        <InputGroup>
                            <Form.Control
                            placeholder="Upload Title"
                            onChange={(e) => setUploadTitle(e.target.value)}
                            required
                            />

                            <Form.Control
                                required
                                type="file"
                                placeholder="Upload File"
                                onChange={(e) => setUploadFile(e.target.files)}
                            />

                        <Form.Control
                        required
                            placeholder="Upload Author"
                            onChange={(e) => setUploadAuthor(e.target.value)}
                            />

                        </InputGroup>
                        <br/>
                        <Button variant="primary" type="submit" id="button-addon2">
                            Create
                            </Button>
                </Form>

                <br/><br/>

                <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>File</th>
            <th>Author</th>
          </tr>
        </thead>
        <tbody>
          {
            uploads.map((upload) => {
              return (
                <tr key={ upload.id }>
                  <td>{ upload.title }</td>
                  <td>{ upload.file }</td>
                  <td>{ upload.author }</td>
                </tr>
              )
            })
          }
        </tbody>
    </Table>
        </Card.Body>
        </Card>
      </header>

      <footer>
        <br/>
        { currentDate }
        <br /> <br />
        <Button onClick={logout}>Logout</Button>
        <br/><br/>
      </footer>
    </div>
    )
}

export default Upload;