import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const PostForm = ({file, image, setfile,setimage}) => {
 
    const navigate = useNavigate()
    
    const fun=()=>{
        navigate("/video")
    }
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
      <>
      <Navbar/>
 <div className='newPostCard'>
        
        <div className="postForm">
          
        <button className='sendBtn'>
          <label htmlFor='file' >
            <img 
            className='addImg'
            src="https://static.thenounproject.com/png/1156518-200.png"/>
             <p className="uploadtxt">Upload an image</p>
            </label>

            <input
           onChange={e => setfile(e.target.files[0])}
           id="file" 
           style={{"display":"none"}} 
           type="file"/>

         </button>

         <button className='sendBtn' onClick={e => fun()}>
          
            <img 
            className='addImg'
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTm_P_betmyIlxr1o0ZEV48aLjtpv-yBeqRWPWQd8nXygrPuWXED1AXcCcNd9fpjO0JfTg&usqp=CAU"
            />
             <p style={{"marginTop": "25px"}} className="uploadtxt">Real time video</p>
            

         </button>

          
        </div>
     </div>
     </>
     )
};

export default PostForm;
