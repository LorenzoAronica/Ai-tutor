import React, { useState } from "react";

export default function App() {
  const [topic, setTopic] = useState("");
  const [response, setResponse] = useState("");

  const handleSend = async () => {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4-turbo",
        messages: [
          { role: "system", content: "Sei un tutor scolastico che spiega in modo semplice." },
          { role: "user", content: topic }
        ]
      })
    });
    const data = await res.json();
    setResponse(data.choices[0].message.content);
  };

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1>👋 Ciao! Sono il tuo Tutor AI</h1>
      <p>Scrivi un argomento qui sotto:</p>
      <input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Es: Spiegami il DNA"
        style={{ width: "80%", padding: 8 }}
      />
      <button onClick={handleSend} style={{ marginLeft: 10 }}>Invia</button>
      {response && (
        <div style={{ marginTop: 20, background: "#f4f4f4", padding: 10 }}>
          <strong>Risposta:</strong>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}