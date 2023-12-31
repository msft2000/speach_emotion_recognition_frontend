import React from "react";
import { AudioRecorder } from "react-audio-voice-recorder";
import toast, { Toaster } from "react-hot-toast";
import "../scss/SinglePage.scss";

function SinglePage() {
  const [audioWeb3, setAudioWeb3] = React.useState(null);
  const [respuesta, setRespuesta] = React.useState(null);
  const sendAudioToApi = (blob) => {
    const toastId = toast.loading("Loading...");
    const url = URL.createObjectURL(blob);
    setAudioWeb3(url);
    const formData = new FormData();
    formData.append("audio_file", blob);
    fetch("https://speach-emotion-recognition-api.onrender.com/predict/", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((response) => {
        setRespuesta(response);
        toast.dismiss(toastId);
        toast.success("Success", { duration: 1000 });
      });
  };
  return (
    <div id="landing--container">
      <h1>Speach Emotion Recognition</h1>
      <div className="recorder--container">
        <AudioRecorder
          onRecordingComplete={sendAudioToApi}
          audioTrackConstraints={{
            noiseSuppression: true,
            echoCancellation: true,
          }}
          downloadFileExtension="web3"
          onClick={() => {
            setAudioWeb3(null);
            setRespuesta(null);
          }}
        />
        {audioWeb3 && <audio controls src={audioWeb3} />}
        {respuesta && respuesta.error && (
          <div className="respuesta">
            <h2>Error</h2>
            <p>{respuesta.error}</p>
          </div>
        )}
        {respuesta && !respuesta.error && (
          <div className="respuesta">
            {/* emotions:'calm', 'happy', 'fearful', 'disgust' */}
            <h2>
              Emotion Detected:{" "}
              <span
                style={{
                  color:
                    respuesta.emotional_prediction === "calm"
                      ? "purple"
                      : respuesta.emotional_prediction === "happy"
                      ? "green"
                      : respuesta.emotional_prediction === "fearful"
                      ? "tomato"
                      : respuesta.emotional_prediction === "disgust"
                      ? "red"
                      : "black",
                }}
              >
                {respuesta.emotional_prediction}
              </span>
            </h2>
          </div>
        )}
      </div>
      <Toaster />
    </div>
  );
}

export { SinglePage };
