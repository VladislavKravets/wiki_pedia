import React, {useState} from "react";
import baseUrl from '../config';


function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    // Виконати запит на реєстрацію нового користувача
    fetch(baseUrl + '/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
      .then(response => response.json())
      .then(data => {
        // Перенаправити користувача на сторінку авторизації
        window.location.href = '/login';
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="form-container">
      <h2 className="page-title">Реєстрація</h2>
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
      <button onClick={handleRegister}>Зареєструватись</button>
    </div>
  );
}

export default RegisterPage;
