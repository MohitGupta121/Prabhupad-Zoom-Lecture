import React, { useState, useRef } from "react";

function PrabhupadZoomLectureApp() {
  const [imageSrc, setImageSrc] = useState("");
  const [mediaSrc, setMediaSrc] = useState("");
  const [mediaType, setMediaType] = useState("");
  const audioRef = useRef(null);
  const videoRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Handle Image Change (URL or File)
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setImageSrc(event.target.result);
      reader.readAsDataURL(file);
    } else {
      setImageSrc(e.target.value);
    }
  };

  // Handle Media Change (URL or File)
  const handleMediaChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const fileType = file.type.startsWith("audio") ? "audio" : "video";
        setMediaType(fileType);
        setMediaSrc(event.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      const url = e.target.value;
      const fileExtension = url.split(".").pop().toLowerCase();
      const videoExtensions = ["mp4", "webm", "ogg", "mov"];
      const fileType = videoExtensions.includes(fileExtension) ? "video" : "audio";
      setMediaType(fileType);
      setMediaSrc(url);
    }
  };

  // Toggle play and pause
  const toggleMedia = () => {
    const mediaElement = mediaType === "audio" ? audioRef.current : videoRef.current;
    if (mediaElement.paused) {
      mediaElement.play();
    } else {
      mediaElement.pause();
    }
  };

  // Handle Media Time Update for Slider
  const handleTimeUpdate = () => {
    const mediaElement = mediaType === "audio" ? audioRef.current : videoRef.current;
    setCurrentTime(mediaElement.currentTime);
    setDuration(mediaElement.duration);
  };

  // Handle Slider Change
  const handleSliderChange = (e) => {
    const mediaElement = mediaType === "audio" ? audioRef.current : videoRef.current;
    mediaElement.currentTime = e.target.value;
    setCurrentTime(mediaElement.currentTime);
  };

  return (
    <div style={styles.appContainer}>
      <header style={styles.header}>
        <h1 style={styles.title}>Prabhupad Zoom Lecture</h1>
        <p style={styles.subtitle}>"Engage in the divine teachings of Srila Prabhupad."</p>
      </header>

      {/* Form for Image Input */}
      <div style={styles.formContainer}>
        <label>Image URL or Upload:</label>
        <br />
        <input
          type="text"
          placeholder="Image URL"
          onChange={handleImageChange}
          style={styles.input}
        />
        <input type="file" accept="image/*" onChange={handleImageChange} style={styles.inputFile} />
      </div>

      {/* Form for Media Input */}
      <div style={styles.formContainer}>
        <label>Audio/Video URL or Upload:</label>
        <br />
        <input
          type="text"
          placeholder="Audio/Video URL"
          onChange={handleMediaChange}
          style={styles.input}
        />
        <input type="file" accept="audio/*,video/*" onChange={handleMediaChange} style={styles.inputFile} />
      </div>

      {/* Media Display */}
      {imageSrc && mediaSrc && (
        <div style={styles.mediaContainer}>
          <img src={imageSrc} alt="Uploaded" style={styles.image} onClick={toggleMedia} />
          
          {/* Message to Click */}
          <p style={styles.clickMessage}>Click on the image to play/pause the lecture</p>

          {/* Hidden Audio or Video Player */}
          {mediaType === "audio" && (
            <audio
              ref={audioRef}
              src={mediaSrc}
              onTimeUpdate={handleTimeUpdate}
              preload="auto"
            />
          )}
          {mediaType === "video" && (
            <video
              ref={videoRef}
              src={mediaSrc}
              onTimeUpdate={handleTimeUpdate}
              preload="auto"
              style={{ display: "none" }} // Hide the video element
            />
          )}

          {/* Timeline Slider */}
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleSliderChange}
            style={styles.slider}
          />
        </div>
      )}

      <footer style={styles.footer}>
        <p style={styles.footerText}>
          "Hearing and chanting about the transcendental pastimes of the Lord purifies the heart."
          – Srila Prabhupad
        </p>
      </footer>
    </div>
  );
}

const styles = {
  appContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    backgroundColor: "#f0f0f0",
    minHeight: "100vh",
    backgroundImage: 'url("https://www.transparenttextures.com/patterns/old-map.png")',
    backgroundSize: "cover",
  },
  header: {
    textAlign: "center",
    marginBottom: "30px",
    color: "#4b2e83",
  },
  title: {
    fontSize: "32px",
    fontFamily: "'Dancing Script', cursive",
  },
  subtitle: {
    fontSize: "18px",
    fontFamily: "'Lora', serif",
  },
  formContainer: {
    marginBottom: "20px",
    textAlign: "center",
  },
  input: {
    margin: "10px",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "2px solid #4b2e83",
  },
  inputFile: {
    margin: "10px",
    padding: "10px",
  },
  mediaContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100vw",
    height: "100vh",
    backgroundColor: "#4b2e83",
    position: "relative",
    padding: "20px",
  },
  image: {
    width: "100%",
    height: "auto",
    maxHeight: "100%",
    aspectRatio: "16 / 9",
    objectFit: "cover",
    cursor: "pointer",
    borderRadius: "20px",
  },
  clickMessage: {
    color: "#fff",
    fontSize: "18px",
    fontFamily: "'Lora', serif",
    marginTop: "15px",
    textAlign: "center",
  },
  slider: {
    position: "absolute",
    bottom: "20px",
    width: "80%",
  },
  footer: {
    marginTop: "20px",
    textAlign: "center",
    padding: "10px",
    color: "#4b2e83",
  },
  footerText: {
    fontSize: "16px",
    fontFamily: "'Lora', serif",
  },
};

export default PrabhupadZoomLectureApp;
