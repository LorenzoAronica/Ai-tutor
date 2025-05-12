import React, { useState } from 'react';

export default function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const sendQuestion = async () => {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4-turbo",
        messages: [
          { role: "system", content: "Sei un tutor scolastico che spiega le cose in modo semplice e diretto." },
          { role: "user", content: input }
        ]
      })
    });

    const data = await res.json();
    setResponse(data.choices?.[0]?.message?.content || "Errore nella risposta");
  };

  return (
    <div style={{ fontWeight: 300, fontFamily: "Arial" }}>
      <h1>🎓 Tutor di intelligenza artificiale</h1>
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Fai una domanda..."
      />
      <button onClick={sendQuestion}>Invia</button>
      <p>{response}</p>
    </div>
  );
}
