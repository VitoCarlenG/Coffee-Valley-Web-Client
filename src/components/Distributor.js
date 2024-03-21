import { Nav, Card, Table, Button } from 'react-bootstrap';
import '../App.css';
import React, { useState, useEffect } from "react";
import cv from '../assets/cv.png'
import moment from "moment"
import axios from 'axios';
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom';

const Distributor = () => {
    const [distributors, setDistributors] = useState([]);
    const currentDate = moment().format('LL');

    const getDistributors = () => {
        axios.get(`http://localhost:3001/distributors`)
          .then(async res => {
            setDistributors(await res.data)
          })
    }

    const createDistributor = (e) => {
        e.preventDefault()
        
        window.location.replace('/distributor/create');
    }

    const logout = async (e) => {
        e.preventDefault()

        sessionStorage.removeItem('id');

        await Swal.fire("Logout Success");
        
        window.location.replace('/login');
    }

    useEffect(() => {
        getDistributors();
    }, [])

    return (
        <div className="App">
      <header>
        <img src={cv} className="App-logo" alt="logo" />
        <h1>Coffee Valley</h1>
        <br/>
        <Card>
        <Card.Header>
            <Nav variant="tabs" defaultActiveKey="Distributor">
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
        <Button onClick={createDistributor}>Create</Button>
        <br/><br/>
        <Table striped bordered hover>
        <thead>
          <tr>
            <th>Distributor</th>
            <th>City</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            distributors.map((distributor) => {
              return (
                <tr key={ distributor.id }>
                  <td>{ distributor.name }</td>
                  <td>{ distributor.city }</td>
                  <td>
                    <Link to={`update/${distributor.id}`}>
                        <Button variant="warning" id="button-addon2">
                            Update
                        </Button>
                    </Link>
                  </td>
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

export default Distributor;