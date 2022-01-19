import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = ({setimage, setfile}) => {

    const fun=()=>{
        setimage(null);
        setfile(null);
    }

    return (
        <div className='navbar'>
            <span onClick={fun} ><Link className="linkClass" to="/">FaceDetector</Link></span>
        </div>
    )
}

export default Navbar
