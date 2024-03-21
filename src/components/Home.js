import '../App.css';
import { Nav, Card, Button } from 'react-bootstrap';
import React, { useState, useEffect } from "react";
import cv from '../assets/cv.png'
import moment from "moment"
import axios from 'axios';
import Swal from 'sweetalert2'

function Home() {
  const [dailyBeanName, setDailyBeanName] = useState("");
  const [dailyBeanSalePrice, setDailyBeanSalePrice] = useState("");
  const [dailyBeanDescription, setDailyBeanDescription] = useState("");
  const currentDate = moment().format('LL');

  const logout = async (e) => {
    e.preventDefault()

    sessionStorage.removeItem('id');

    await Swal.fire("Logout Success");
    
    window.location.replace('/login');
}

  useEffect(() => {
    axios.get(`http://localhost:3001/daily-bean`)
      .then(async res => {
        setDailyBeanName(await res.data[0].name)
        setDailyBeanSalePrice(await res.data[0].sale_price)
        setDailyBeanDescription(await res.data[0].description)

      })
  }, [])

  return (
    <div className="App">
      <header>
        <img src={cv} className="App-logo" alt="logo" />
        <h1>Coffee Valley</h1>
        <br/>
        <Card>
        <Card.Header>
            <Nav variant="tabs" defaultActiveKey="Home">
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
            <Card.Title>Bean of the Day: {dailyBeanName}</Card.Title>
            <b>Price: ${dailyBeanSalePrice}.00</b>
            <Card.Text>
                {dailyBeanDescription}
            </Card.Text>
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
  );
}

export default Home;
