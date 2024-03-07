import React, { useState, useEffect, useCallback } from "react";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";

const SpeechToText = ({ onTranscript }) => {
  const [isListening, setIsListening] = useState(false);
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.continuous = true; // Consider setting this to false if you want it to stop after a single utterance
  recognition.interimResults = true;

  const handleStop = useCallback(() => {
    recognition.stop();
    setIsListening(false);
  }, [recognition]);

  const handleStart = useCallback(() => {
    recognition.start();
    setIsListening(true);
  }, [recognition]);

  const toggleListening = () => {
    if (isListening) {
      handleStop();
    } else {
      handleStart();
    }
  };

  useEffect(() => {
    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
      onTranscript(transcript);
    };

    recognition.onend = () => {
      if (isListening) handleStart(); // Re-start recognition if it stops unexpectedly and isListening is true
    };

    return () => {
      recognition.stop(); // Ensure the recognition stops when the component unmounts
    };
  }, [recognition, onTranscript, isListening, handleStart]);

  return (
    <button
      onClick={toggleListening}
      className="p-3 border-none bg-gray-200 dark:text-white rounded-md dark:bg-slate-700 outline-none transition duration-300 hover:bg-slate-300 dark:hover:bg-slate-800 cursor-pointer active:bg-slate-200 dark:active:bg-slate-600"
    >
      {isListening ? <FaMicrophoneSlash /> : <FaMicrophone />}
    </button>
  );
};

export default SpeechToText;
