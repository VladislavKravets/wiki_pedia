import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import baseUrl from '../config';


function ArticlePage() {
  const { title } = useParams();

  const [article, setArticle] = useState(null);

  useEffect(() => {
    // Отримати деталі статті з бекенду за її ідентифікатором
    fetch(baseUrl + `/articles/${title}`)
      .then(response => response.json())
      .then(data => setArticle(data))
      .catch(error => console.error(error));
  }, [title]);

  if (!article) {
    return <div className="loading">Loading...</div>;
  }

  //console.log(article);

  return (
    <div>
      <Link to={`/update-article`} state={{ article: article }}>
        Змінити статтю
      </Link>
      <h1 className="page-title">{article.title}</h1>
      <p className="article-content">{article.content}</p>
    </div>
  );
}

export default ArticlePage;
