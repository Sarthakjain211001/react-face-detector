import './App.css';
import React, {useState, useRef, useEffect} from 'react'
import Navbar from './components/Navbar';
import NewPost from './components/NewPost';
import PostForm from './components/PostForm';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
}from 'react-router-dom'
import NewPostVideo from './components/NewPostVideo';

const App = () => {

  const [file, setfile] = useState(null);
  const [image, setimage] = useState(null);

  

  // const navigate = useNavigate();

  return (
    <div>
      {/* <Navbar/> */}
<Router>
<Routes>
    <Route exact path="/" element={image ? <Navigate replace to="/image"/> : <PostForm image={image} file={file} setfile={setfile} setimage={setimage}/>}/>
    <Route exact path="/image" element ={ image ? <NewPost image={image} setimage={setimage} setfile={setfile}/> : <Navigate replace to="/"/> }/>
    <Route exact path="/video" element ={<NewPostVideo setimage={setimage} setfile={setfile}/>}/>
  </Routes>
</Router>
    </div>
  )
}

export default App
