import { useState } from "react";
import MicRecorder from "mic-recorder-to-mp3";

export default function AudioRecorder({ onRecordingComplete }) {
  const [isRecording, setIsRecording] = useState(false);
  const [recorder, setRecorder] = useState(null);

  const startRecording = () => {
    const mp3Recorder = new MicRecorder({ bitRate: 128 });
    setRecorder(mp3Recorder);
    mp3Recorder.start().then(() => {
      setIsRecording(true);
    });
  };

  const stopRecording = () => {
    recorder
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
        onRecordingComplete(blob);
        setIsRecording(false);
      });
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 w-full max-w-md"></div>
      <button
        onClick={isRecording ? stopRecording : startRecording}
        className={`px-8 py-3 mt-4 rounded-full font-semibold shadow-lg transition duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-opacity-50 ${
          isRecording
            ? "bg-red-600 hover:bg-red-700 focus:ring-red-500"
            : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
        } text-white`}
      >
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button>
    </div>
  );
}
