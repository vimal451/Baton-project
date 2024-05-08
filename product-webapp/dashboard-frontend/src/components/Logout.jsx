import axios from 'axios';
import React, { useEffect } from 'react';
import { Navigate } from 'react-router';

const Logout = () => {
    useEffect(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('emailId');
        delete axios.defaults.headers.common['Authorization'];
    }, []);

    return <Navigate to="/login" replace key={Date.now()} />;
}

export default Logout;
