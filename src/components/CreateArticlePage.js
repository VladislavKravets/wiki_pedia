import React, { useState } from 'react';
import baseUrl from '../config';


function CreateArticlePage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const handleCreateArticle = () => {
    fetch(`${baseUrl}/articles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },

      body: JSON.stringify({ title, content }),
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(data => {
        console.log(data);
        window.location.href = '/';
      })
      .catch(error => setError(error.message));
  };

  return (
    <div>
      <h2>Створити статтю</h2>
      <div>
        <label>Заголовок:</label>
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
      </div>
      <div>
        <label>Зміст:</label>
        <textarea value={content} onChange={e => setContent(e.target.value)} />
      </div>
      <button onClick={handleCreateArticle}>Створити</button>
    </div>
  );
}

export default CreateArticlePage;
