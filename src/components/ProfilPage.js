import React, { useState, useEffect } from 'react';

function ProfilePage() {
  const userString = localStorage.getItem('user');
  const user = userString !== null && userString !== 'undefined' ? JSON.parse(userString) : {};

  if (!user.username) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div>
      <h2 className="page-title">Профіль користувача</h2>
      <p>Ім'я: {user.username}</p>
      <p>Роль: {user.admin ? 'admin' : 'user'}</p>
    </div>
  );
}

export default ProfilePage;
