/* ---from IMAGE--- */

const image = document.getElementById("image");

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri("./models"),
    //faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
    //faceapi.nets.tinyYolov2.loadFromUri("./models"),
    
    faceapi.nets.faceLandmark68Net.loadFromUri("./models"),
    //faceapi.nets.faceLandmark68TinyNet.loadFromUri("./models"),    
    
    faceapi.nets.faceExpressionNet.loadFromUri("./models"), // for expressions detection
    
    //faceapi.nets.ageGenderNet.loadFromUri("./models")
])
.then(startDetection);

async function startDetection(){
  const canvas = faceapi.createCanvasFromMedia(image);
  document.body.append(canvas);
  const displaySize = {width: image.width, height: image.height};


  const faces = await faceapi.detectAllFaces( image, new faceapi.TinyFaceDetectorOptions() )
                              .withFaceLandmarks()
                              .withFaceExpressions();

  const resizedFaces = faceapi.resizeResults(faces, displaySize);

  canvas.getContext('2d', {willReadFrequently: true} ).clearRect(0,0, canvas.width, canvas.height);
  faceapi.draw.drawDetections(canvas, resizedFaces);
  faceapi.draw.drawFaceExpressions(canvas,resizedFaces);
}
/* -------- */


/*--FROM VIDEO --*/
/*

const video = document.getElementById("video");

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri("./models"),
    //faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
    //faceapi.nets.tinyYolov2.loadFromUri("./models"),
    faceapi.nets.faceLandmark68Net.loadFromUri("./models"),
    //faceapi.nets.faceLandmark68TinyNet.loadFromUri("./models"),    
    faceapi.nets.faceExpressionNet.loadFromUri("./models"), // for expressions detection
    //faceapi.nets.ageGenderNet.loadFromUri("./models")
])
.then(startVideo);



function startVideo(){
  navigator.getUserMedia(
        {video:{}},
        stream => video.srcObject = stream,
        err => console.error(err)
  );
}

video.addEventListener('play', startDetectionVideo);

async function startDetectionVideo()
{
  const canvas = faceapi.createCanvasFromMedia(video);
  document.body.append(canvas);
  
  const displaySize = {width: video.width, height: video.height};
  faceapi.matchDimensions(canvas, displaySize);
                   
  setInterval(async ()=> {
    const faces = await faceapi.detectAllFaces( video, new faceapi.TinyFaceDetectorOptions() )
                               .withFaceExpressions();
        
    const resizedFaces = faceapi.resizeResults(faces, displaySize);
    canvas.getContext('2d').clearRect(0,0, canvas.width, canvas.height);
    faceapi.draw.drawDetections(canvas, resizedFaces);
    faceapi.draw.drawFaceExpressions(canvas,resizedFaces);
  }, 100);

}

*/
