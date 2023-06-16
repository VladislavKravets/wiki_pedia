import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Routes as Switch, Route, Link, useParams} from 'react-router-dom';

import './App.css';
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import ArticlePage from "./components/ArticlePage";
import ProfilePage from "./components/ProfilPage";
import CreateArticlePage from "./components/CreateArticlePage";
import UpdateArticlePage from "./components/UpdateArticlePage";

function App() {
  const userString = localStorage.getItem('user');
  const user = userString !== null && userString !== 'undefined' ? JSON.parse(userString) : {};
  const { title } = useParams();

  return (
    <Router>
      <div className="container">
        <nav className="navbar">
          <ul>
            <li>
              <Link to="/">Головна</Link>
            </li>
            {
              user.username ?
                <>
                  <li>
                    <Link to= { "/profile" }>
                      Профіль користувача
                    </Link>
                  </li>
                  {
                    user.admin ?
                      <>
                        <li>
                          <Link to="/create-article">Додати статтю</Link>
                        </li>
                      </>
                      :
                      <>
                      </>
                  }
                  <button onClick={
                    () => {
                      localStorage.clear();
                      window.location.href = '/';
                    }
                  }>Вийти
                  </button>
                </>
                :
                <>
                  <li>
                    <Link to="/login">Авторизація</Link>
                  </li>
                  <li>
                    <Link to="/register">Реєстрація</Link>
                  </li>
                </>
            }
          </ul>
        </nav>

        <Switch>
          <Route exact path="/" element={<HomePage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/article/:title" element={<ArticlePage/>}/>
          <Route path="/profile" element={<ProfilePage/>}/>
          <Route path="/create-article" element={<CreateArticlePage/>} />
          <Route path="/update-article" element={<UpdateArticlePage />} />
        </Switch>
      </div>
    </Router>
  );
}


export default App;
