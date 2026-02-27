# AI Gesture Recognition Project Guide

## 📋 Project Overview

This is a **React-based AI Gesture Recognition** application that uses:

- **TensorFlow.js HandPose Model** - Detects and tracks hand landmarks in real-time
- **Fingerpose Library** - Recognizes specific hand gestures
- **React Webcam** - Captures video from your webcam
- **React** - Modern UI framework

## 🎯 How It Works

### 1. **Hand Detection**

- The app uses TensorFlow.js HandPose model to detect hands in the webcam feed
- It identifies 21 key points (landmarks) on each hand:
  - 4 points on each finger (thumb, index, middle, ring, pinky)
  - 1 point at the wrist

### 2. **Gesture Recognition**

- The Fingerpose library analyzes the hand landmarks
- It compares the hand position to predefined gestures
- Recognizes gestures like thumbs up, victory sign, fist, etc.

### 3. **Real-time Visualization**

- Draws green dots on detected hand landmarks
- Connects landmarks with lines to show hand structure
- Displays the recognized gesture name

## 🚀 How to Run the Project

### Prerequisites

- Node.js
- npm or yarn
- A webcam

### Steps:

1. **Install Dependencies** (if not already installed):

   ```bash
   npm install
   ```

2. **Start the Development Server**:

   ```bash
   npm start
   ```

3. **Open in Browser**:

   - The app will automatically open at `http://localhost:3000`
   - If it doesn't, manually navigate to that URL

4. **Allow Camera Access**:

   - When prompted, allow the browser to access your webcam
   - Make sure you're in a well-lit area

5. **Use the App**:
   - Show your hand to the camera
   - Make one of the supported gestures
   - Watch as the app recognizes your gesture in real-time!

## ✋ Supported Gestures

The app recognizes the following gestures:

1. **👍 Thumbs Up** - Raise your thumb up
2. **👎 Thumbs Down** - Point your thumb down
3. **✌️ Victory** - Make a peace sign (index and middle finger up)
4. **👉 Thumb Right** - Point your thumb to the right
5. **👈 Thumb Left** - Point your thumb to the left
6. **✋ Open Hand** - Spread all fingers
7. **✊ Closed Fist** - Make a fist

## 📁 Project Structure

```
aigesture/
├── public/
│   └── index.html          # HTML template
├── src/
│   ├── App.js             # Main application component
│   ├── App.css            # Application styles
│   ├── index.js           # React entry point
│   └── index.css          # Global styles
├── package.json           # Dependencies and scripts
└── README.md             # Project documentation
```

## 🔧 Key Components

### App.js

- Main React component that handles:
  - Webcam initialization
  - TensorFlow model loading
  - Hand detection loop
  - Gesture recognition
  - Canvas drawing for visualization

### Technologies Used:

- **@tensorflow-models/handpose** (v0.0.7) - Hand detection model
- **@tensorflow/tfjs** (v3.7.0) - TensorFlow.js core
- **fingerpose** (v0.0.2) - Gesture recognition
- **react-webcam** (v5.2.4) - Webcam access
- **react** (v17.0.2) - UI framework

## 🎨 Features

- ✅ Real-time hand detection
- ✅ Live gesture recognition
- ✅ Visual feedback with landmarks
- ✅ Modern, responsive UI
- ✅ Works in browser (no server needed)
- ✅ No data sent to external servers (privacy-friendly)

## 🐛 Troubleshooting

### Camera not working?

- Check browser permissions
- Make sure no other app is using the camera
- Try refreshing the page

### Model not loading?

- Check your internet connection (first load downloads the model)
- Try clearing browser cache
- Make sure you're using a modern browser (Chrome, Firefox, Edge)

### Gestures not recognized?

- Ensure good lighting
- Keep your hand clearly visible
- Make gestures clearly and hold them steady
- Keep your hand at a reasonable distance from the camera

## 📝 Customization

### Adding New Gestures

You can add custom gestures by modifying the `App.js` file:

1. Import Fingerpose gesture definitions
2. Create your custom gesture using Fingerpose
3. Add it to the GestureEstimator array

Example:

```javascript
const customGesture = new fp.GestureDescription("customGesture");
// Define finger positions...
GE.addGesture(customGesture);
```

### Styling

Modify `App.css` to change the appearance:

- Colors, fonts, layout
- Video container size
- Gesture display styling

## 🌐 Browser Compatibility

- ✅ Chrome/Edge (recommended)
- ✅ Firefox
- ✅ Safari (may have limitations)
- ❌ Internet Explorer (not supported)

## 📚 Learning Resources

- [TensorFlow.js Documentation](https://www.tensorflow.org/js)
- [HandPose Model](https://github.com/tensorflow/tfjs-models/tree/master/handpose)
- [Fingerpose Library](https://github.com/andypotato/fingerpose)
- [React Documentation](https://reactjs.org/)

## 🎓 What You'll Learn

By working with this project, you'll understand:

- How to integrate AI models in web applications
- Real-time video processing in the browser
- React hooks (useState, useEffect, useRef)
- Canvas API for drawing
- Webcam API integration

---

**Enjoy building with AI! 🤖✨**
