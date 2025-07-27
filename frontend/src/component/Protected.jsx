import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";


const Protected = ({ children }) => {
    const navigate = useNavigate()

    const [status, setStatus] = useState('loading')

    useEffect(() => {
        axios.get('https://library-management-dwg7.onrender.com/user/me', {
            withCredentials: true
        })
            .then((res) => {
                if (res.status === 200) {
                    setStatus('success')
                }
            })
            .catch((err) => {
                console.log(err);
                setStatus('error')
            })
    }, [])


    if (status === 'loading') {
        return <div>Loading...</div>
    }
    if (status === 'error') {
        navigate('/login')
        return <div>Unauthorized access</div>
    }
    return children
}

export default Protected
