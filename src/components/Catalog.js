import { Nav, Card, Table, Button } from 'react-bootstrap';
import '../App.css';
import React, { useState, useEffect } from "react";
import cv from '../assets/cv.png'
import moment from "moment"
import axios from 'axios';
import Swal from 'sweetalert2'

const Catalog = () => {
    const [beans, setBeans] = useState([]);
    const currentDate = moment().format('LL');

    const getBeans = () => {
        axios.get(`http://localhost:3001/beans`)
          .then(async res => {
            setBeans(await res.data)
          })
    }

    const logout = async (e) => {
        e.preventDefault()

        sessionStorage.removeItem('id');

        await Swal.fire("Logout Success");
        
        window.location.replace('/login');
    }

    useEffect(() => {
        getBeans();
    }, [])

    return (
        <div className="App">
      <header>
        <img src={cv} className="App-logo" alt="logo" />
        <h1>Coffee Valley</h1>
        <br/>
        <Card>
        <Card.Header>
            <Nav variant="tabs" defaultActiveKey="Catalog">
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
        <Table striped bordered hover>
        <thead>
          <tr>
            <th>Bean</th>
            <th>Description</th>
            <th>Price/Unit</th>
          </tr>
        </thead>
        <tbody>
          {
            beans.map((bean) => {
              return (
                <tr key={ bean.id }>
                  <td>{ bean.name }</td>
                  <td>{ bean.description }</td>
                  <td>${ bean.price }.00</td>
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

export default Catalog;