import './App.css';
import React, {useRef, useEffect} from 'react'
import * as faceapi from 'face-api.js'

const App = () => {

  const imgRef = useRef();    //useRef() is same as document.getElementByID("")
  const canvasRef = useRef();

  const handleImage = async ()=>{
     const detections = await faceapi 
     .detectAllFaces(imgRef.current, new faceapi.TinyFaceDetectorOptions())
     .withFaceLandmarks()
     .withFaceExpressions();
    //  .withAgeAndGender();

     console.log(detections)
  }

  useEffect(()=>{
    const loadModels = ()=>{
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
        faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
        faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
        faceapi.nets.faceExpressionNet.loadFromUri("/models"),
      ])
      .then(handleImage)
      .catch((err)=> console.log(err));
    };

    imgRef.current && loadModels()
  } , [])

  return (
    <div className='App'>
    <img  
    crossOrigin='anonymous'
    ref = {imgRef}
    style={{"objectFit": "cover"}}
    src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvULB4tfyXgIpY7BVOw0AnIykmXPLzlkLzsg&usqp=CAU' 
    alt="" 
    width="940" 
    height = "650" 
    />
    <canvas ref = {canvasRef} width="940" height="650"/>
    </div>
  )
}

export default App
