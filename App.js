import React, { useState } from "react";

export default function App() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

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
    <div style={{ padding: 30, fontFamily: "Arial" }}>
      <h1>🎓 AI Tutor</h1>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Scrivi una domanda (es: spiegami la fotosintesi)"
        style={{ width: "80%", padding: 10 }}
      />
      <button onClick={sendQuestion} style={{ marginLeft: 10 }}>Invia</button>
      <div style={{ marginTop: 20, backgroundColor: "#f2f2f2", padding: 15 }}>
        {response && <p><strong>Risposta:</strong><br />{response}</p>}
      </div>
    </div>
  );
}