import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Catalog from './components/Catalog';
import Distributor from './components/Distributor';
import CreateDistributor from './components/CreateDistributor';
import UpdateDistributor from './components/UpdateDistributor';
import Upload from './components/Upload';

const App = () => {
  const isLoggedIn = !!sessionStorage.getItem('id');

  return (
    <Router>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Home /> : <Login /> } />
        <Route path="/login" element={isLoggedIn ? <Home /> : <Login /> } />
        <Route path="/catalog" element={isLoggedIn ? <Catalog /> : <Login /> } />
        <Route path="/distributor" element={isLoggedIn ? <Distributor /> : <Login /> } />
        <Route path="/distributor/create" element={isLoggedIn ? <CreateDistributor /> : <Login /> } />
        <Route path="/distributor/update/:id" element={isLoggedIn ? <UpdateDistributor /> : <Login /> } />
        <Route path="/upload" element={isLoggedIn ? <Upload /> : <Login /> } />
      </Routes>
    </Router>
  );
};

export default App;
