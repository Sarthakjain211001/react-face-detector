import React, { useEffect, useRef } from 'react'
import Navbar from './Navbar'
import * as faceapi from 'face-api.js'

const NewPostVideo = ({setimage,setfile}) => {

    const videoRef = useRef(null);
    const canvasRef = useRef(null); 

    // const startVideo = ()=>{
    //     navigator.getUserMedia(
    //         {video: {}},
    //         stream => video.srcObject = stream,
    //         err => console.error(err)
    //     )
    // }

    // useEffect(()=>{
    //   startVideo()
    // },[video])


    useEffect(()=>{
        const startVideo = async()=>{
            try{
                const stream = await navigator.mediaDevices.getUserMedia({video : true});
                videoRef.current.srcObject = stream;
            }catch(err){
                console.error(err);
            }
        };

              Promise.all([
                faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
                faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
                faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
                faceapi.nets.faceExpressionNet.loadFromUri("/models"),
              ])
              .then(startVideo())
              .catch((err)=> console.log(err));
        
    }, [])

//     videoRef.current.addEventListener('play', ()=>{
//         console.log("dsgdffzgdf");
//    })

const playFun=()=>{
    const Video = document.getElementById("video");
    
  if(Video){  
    canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(Video);

    faceapi.matchDimensions(canvasRef.current, {width: Video.width, height: Video.height})
    setInterval( async()=> {
        const detections = await faceapi.detectAllFaces(Video, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks().withFaceExpressions()
        // console.log(detections);
        // console.log("hi");

        
        faceapi.matchDimensions(canvasRef.current, {
            width: Video.width,
            height: Video.height
          });
      
          const resizedDetections = faceapi.resizeResults(detections, {
            width: Video.width,
            height: Video.height
          })
        
          canvasRef.current.getContext('2d').clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
          faceapi.draw.drawDetections(canvasRef.current, resizedDetections)         //For drawing boxes on the image
          faceapi.draw.drawFaceExpressions(canvasRef.current, resizedDetections)    //For writing the expressions on the image
          faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections)      //For drawing the dotted outline on the image
        
    },100)
}
}    


    return (
        <div>
            <Navbar setimage={setimage} setfile={setfile}/>
            <div className='videoDiv'>
            <video ref={videoRef} onPlay={e=> playFun()} id="video" width="720" height="560" autoPlay muted></video>
            <canvas ref={canvasRef} ></canvas>
            </div>
        </div>
    )

}
export default NewPostVideo
