import './App.css';
import React, {useState, useRef, useEffect} from 'react'
import Navbar from './components/Navbar';
import NewPost from './components/NewPost';

const App = () => {

  const [file, setfile] = useState(null);
  const [image, setimage] = useState(null);

  useEffect(() => {
    const getImage = ()=>{
       const img = new Image();
       img.src = URL.createObjectURL(file);       
       img.onload = ()=> {setimage({
         url: img.src,
         width: img.width,
         height: img.height
       })}

      //  console.log(image)
    };
    file && getImage();
  }, [file]) 

  return (
    <div> 
    <Navbar/>
    {image ? <NewPost image={image}/> : ( 
      <div className='newPostCard'>
        <div className='addPost'>
          <img 
           src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSye8_F5ZHKn2FQ51IdAmOKH3VaIfKkZLXVEA&usqp=CAU'
           alt=""
           className='avatar'
           />
           <div className="postForm">
             <input 
             type="text"
             placeholder="Upload an image to detect the faces."  
             className='postInput'
             />
             
             <label htmlFor='file'>
               <img 
               className='addImg'
               src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPC9VxLvdzYUvCTuNMr3VM-qWt-_sR1Wxm9azXUYom9nOokLnv-Bw_Ik8v5nCTUTB1W5U&usqp=CAU"/>
             <button className='sendBtn'>Send</button>
             </label>
             <input
              onChange={e => setfile(e.target.files[0])}
              id="file" 
              style={{"display":"none"}} 
              type="file"/>
           </div>
        </div>
      </div> )}
    </div>
  )
}

export default App
