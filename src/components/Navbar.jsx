import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

const Navbar = ({setimage, setfile}) => {

    const navigate = useNavigate()
    const fun=()=>{
        setimage(null);
        setfile(null);
      navigate("/")
    }

    return (
        <div className='navbar'>
            <span onClick={fun} >FaceDetector</span>
        </div>
    )
}

export default Navbar
