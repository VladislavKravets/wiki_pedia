import React, {useState} from "react";
import baseUrl from '../config';


function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else if (response.status === 401) {
          throw new Error('Неправильні облікові дані');
        } else {
          throw new Error('Помилка сервера');
        }
      })
      .then(data => {
        // тянем данные профиля пользователя
        fetch(`${baseUrl}/auth/profile?username=${username}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${data.token}` },
        })
          .then(response => response.json())
          .then(user => {
            // Успішний вхід - збереження токена в localStorage і перехід на іншу сторінку
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token', data.token);
            window.location.href = '/profile';
          })
          .catch(error => {
            console.error('Помилка при отриманні профілю користувача:', error);
          });
      })
      .catch(error => setError(error.message));
  };

  return (
    <div className="form-container">
      <h2 className="page-title">Авторизація</h2>
      <input
        type="text"
        placeholder="Ім'я користувача"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Увійти</button>
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default LoginPage;
