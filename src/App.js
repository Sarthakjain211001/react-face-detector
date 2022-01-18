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

    //  console.log(detections)

    canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(imgRef.current);
    faceapi.matchDimensions(canvasRef.current, {
      width: 940,
      height: 650,
    });

    const resized = faceapi.resizeResults(detections, {
      width: 940,
      height: 650,
    })
    faceapi.draw.drawDetections(canvasRef.current, resized)         //For drawing boxes on the image
    faceapi.draw.drawFaceExpressions(canvasRef.current, resized)    //For writing the expressions on the image
    faceapi.draw.drawFaceLandmarks(canvasRef.current, resized)      //For drawing the dotted outline on the image
  }

  useEffect(()=>{
    const loadModels = ()=>{
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
        faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
        // faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
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
    // src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg3ClUuZgxAzmezqlM6f4NZB7rmn3JL9uu5w&usqp=CAU'
    // src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHpkdSWbQqFKeCU4JarGMjFtRPaci6saRQ7g&usqp=CAU'
    alt="" 
    width="940" 
    height = "650" 
    />
    <canvas ref = {canvasRef} width="940" height="650"/>
    </div>
  )
}

export default App
