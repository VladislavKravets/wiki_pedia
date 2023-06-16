import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import baseUrl from '../config';


function HomePage() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // Отримати список статей з бекенду
    fetch(baseUrl  + '/articles')
      .then(response => response.json())
      .then(data => setArticles(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h2 className="page-title">Головна сторінка</h2>
      <ul className="article-list">
        {articles.map(article => (
          <li key={article.id}>
            <Link to={`/article/${article.title}`}>{article.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
