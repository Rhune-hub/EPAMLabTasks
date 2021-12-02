import { useNavigate } from 'react-router';
import React, { useEffect } from 'react';
import './style.css';

export default function NotFound() {
    const navigate = useNavigate();
    useEffect(()=>{setTimeout(() => navigate('/'),3000)}, [navigate]);
  
    return (<h1>Page not found</h1>);
  }