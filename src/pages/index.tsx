import React, { useEffect, useState } from 'react';

const API_URL = 'http://localhost:4000';

export default function Home() {
  const [docs, setDocs] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');
  const [commitMsg, setCommitMsg] = useState('QMS update');

  useEffect(() => {
    fetch(`${API_URL}/documents`)
      .then(res => res.json())
      .then(setDocs);
  }, []);

  const loadDoc = (path: string) => {
    fetch(`${API_URL}/document?path=${encodeURIComponent(path)}`)
      .then(res => res.json())
      .then(data => {
        setSelected(path);
        setContent(data.content);
      });
  };

  const saveDoc = () => {
    if (!selected) return;
    fetch(`${API_URL}/document`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: selected, content }),
    })
      .then(res => res.json())
      .then(() => setMessage('Saved!'));
  };

  const pushGit = () => {
    fetch(`${API_URL}/git/push`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: commitMsg }),
    })
      .then(res => res.json())
      .then(() => setMessage('Pushed to GitHub!'));
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ width: 300, borderRight: '1px solid #ccc', padding: 16 }}>
        <h2>QMS Documents</h2>
        <ul>
          {docs.map(doc => (
            <li key={doc}>
              <button onClick={() => loadDoc(doc)} style={{ background: 'none', border: 'none', color: '#0070f3', cursor: 'pointer' }}>{doc}</button>
            </li>
          ))}
        </ul>
      </div>
      <div style={{ flex: 1, padding: 16 }}>
        {selected ? (
          <>
            <h3>{selected}</h3>
            <textarea value={content} onChange={e => setContent(e.target.value)} style={{ width: '100%', height: 400 }} />
            <div style={{ marginTop: 8 }}>
              <button onClick={saveDoc}>Save</button>
              <input value={commitMsg} onChange={e => setCommitMsg(e.target.value)} style={{ marginLeft: 8, width: 200 }} />
              <button onClick={pushGit} style={{ marginLeft: 8 }}>Git Commit & Push</button>
            </div>
            <div>{message}</div>
          </>
        ) : (
          <div>Select a document to view/edit.</div>
        )}
      </div>
    </div>
  );
}
