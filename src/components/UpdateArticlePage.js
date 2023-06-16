import React, { useState } from 'react';
import baseUrl from '../config';
import {useLocation, useParams} from "react-router-dom";

function UpdateArticlePage() {
  const location = useLocation();
  const article = location.state && location.state.article;

  const [oldTitle, setOldTitle] = useState( article.title);
  const [oldContent, setOldContent] = useState( article.content );
  const [error, setError] = useState('');

  const handleUpdateArticle = () => {
    fetch(`${baseUrl}/articles/${article.title}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },

      body: JSON.stringify({ title: oldTitle, content: oldContent }),
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(data => {
        console.log(data);
        window.location.href = '/article/' + oldTitle;
      })
      .catch(error => setError(error.message));
  };

  return (
    <div>
      <h2>Оновити статтю</h2>
      <div>
        <label>Заголовок:</label>
        <input type="text" value={oldTitle} onChange={e => setOldTitle(e.target.value)} />
      </div>
      <div>
        <label>Зміст:</label>
        <textarea value={oldContent} onChange={e => setOldContent(e.target.value)} />
      </div>
      <button onClick={handleUpdateArticle}>Оновити</button>
    </div>
  );
}

export default UpdateArticlePage;
