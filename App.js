import * as handpose from '@tensorflow-models/handpose';
import '@tensorflow/tfjs-backend-webgl';
import '@tensorflow/tfjs-core';
import * as fp from 'fingerpose';
import React, { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import './App.css';

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [gesture, setGesture] = useState('No gesture detected');
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [error, setError] = useState(null);

  // Initialize gesture recognizer
  const GE = new fp.GestureEstimator([
    fp.Gestures.ThumbsUpGesture,
    fp.Gestures.ThumbsDownGesture,
    fp.Gestures.VictoryGesture,
    fp.Gestures.ThumbRightGesture,
    fp.Gestures.ThumbLeftGesture,
    fp.Gestures.OpenHandGesture,
    fp.Gestures.ClosedFistGesture,
  ]);

  useEffect(() => {
    const loadModel = async () => {
      try {
        const model = await handpose.load();
        setIsModelLoaded(true);
        setError(null);
        
        // Start detection loop
        const detect = async () => {
          if (webcamRef.current && webcamRef.current.video.readyState === 4) {
            const video = webcamRef.current.video;
            const videoWidth = video.videoWidth;
            const videoHeight = video.videoHeight;

            // Set video dimensions
            webcamRef.current.video.width = videoWidth;
            webcamRef.current.video.height = videoHeight;

            // Set canvas dimensions
            if (canvasRef.current) {
              canvasRef.current.width = videoWidth;
              canvasRef.current.height = videoHeight;
            }

            // Detect hands
            const predictions = await model.estimateHands(video);
            
            const ctx = canvasRef.current.getContext('2d');
            ctx.clearRect(0, 0, videoWidth, videoHeight);

            if (predictions.length > 0) {
              // Draw hand landmarks
              for (let i = 0; i < predictions.length; i++) {
                const prediction = predictions[i];
                
                // Draw landmarks
                ctx.fillStyle = '#00ff00';
                for (let j = 0; j < prediction.landmarks.length; j++) {
                  const x = prediction.landmarks[j][0];
                  const y = prediction.landmarks[j][1];
                  ctx.beginPath();
                  ctx.arc(x, y, 5, 0, 2 * Math.PI);
                  ctx.fill();
                }

                // Draw hand connections
                ctx.strokeStyle = '#00ff00';
                ctx.lineWidth = 2;
                const connections = [
                  [0, 1], [1, 2], [2, 3], [3, 4], // Thumb
                  [0, 5], [5, 6], [6, 7], [7, 8], // Index
                  [0, 9], [9, 10], [10, 11], [11, 12], // Middle
                  [0, 13], [13, 14], [14, 15], [15, 16], // Ring
                  [0, 17], [17, 18], [18, 19], [19, 20], // Pinky
                  [5, 9], [9, 13], [13, 17], // Palm
                ];
                
                connections.forEach(([start, end]) => {
                  ctx.beginPath();
                  ctx.moveTo(prediction.landmarks[start][0], prediction.landmarks[start][1]);
                  ctx.lineTo(prediction.landmarks[end][0], prediction.landmarks[end][1]);
                  ctx.stroke();
                });

                // Recognize gesture
                const estimatedGestures = GE.estimate(prediction.landmarks, 7.5);
                
                if (estimatedGestures.gestures.length > 0) {
                  const confidence = estimatedGestures.gestures.reduce((p, c) => {
                    return p.confidence > c.confidence ? p : c;
                  });
                  
                  if (confidence.confidence > 7.5) {
                    setGesture(confidence.name);
                  } else {
                    setGesture('No gesture detected');
                  }
                } else {
                  setGesture('No gesture detected');
                }
              }
            } else {
              setGesture('No hand detected');
            }
          }
          requestAnimationFrame(detect);
        };

        detect();
      } catch (err) {
        console.error('Error loading model:', err);
        setError('Failed to load hand pose model. Please check your browser compatibility.');
        setIsModelLoaded(false);
      }
    };

    loadModel();
  }, []);

  return (
    <div className="App">
      <div className="container">
        <h1 className="title">AI Gesture Recognition</h1>
        <p className="subtitle">Show your hand to the camera and make gestures!</p>
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {!isModelLoaded && !error && (
          <div className="loading">
            <p>Loading AI model...</p>
          </div>
        )}

        <div className="video-container">
          <Webcam
            ref={webcamRef}
            className="webcam"
            audio={false}
            mirrored={true}
            screenshotFormat="image/jpeg"
            videoConstraints={{
              width: 640,
              height: 480,
              facingMode: 'user',
            }}
          />
          <canvas
            ref={canvasRef}
            className="canvas"
          />
        </div>

        <div className="gesture-display">
          <h2>Detected Gesture:</h2>
          <div className="gesture-name">{gesture}</div>
        </div>

        <div className="instructions">
          <h3>Supported Gestures:</h3>
          <ul>
            <li>👍 Thumbs Up</li>
            <li>👎 Thumbs Down</li>
            <li>✌️ Victory</li>
            <li>👉 Thumb Right</li>
            <li>👈 Thumb Left</li>
            <li>✋ Open Hand</li>
            <li>✊ Closed Fist</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;



