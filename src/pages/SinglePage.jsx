import React from "react";
import { AudioRecorder } from "react-audio-voice-recorder";
import "../scss/SinglePage.scss";

function SinglePage() {
  const [audioWeb3, setAudioWeb3] = React.useState(null);
  const [respuesta, setRespuesta] = React.useState(null);
  const sendAudioToApi = (blob) => {
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
        console.log("Success:", response);
        setRespuesta(response);
      });
  };
  return (
    <div id="landing--container">
      <h1>Speach Emotion Recognition</h1>
      <div className="recorder--container">
        <AudioRecorder
          onRec
          onRecordingComplete={sendAudioToApi}
          audioTrackConstraints={{
            noiseSuppression: true,
            echoCancellation: true,
          }}
          downloadFileExtension="web3"
        />
        {audioWeb3 && <audio controls src={audioWeb3} />}
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
    </div>
  );
}

export { SinglePage };
