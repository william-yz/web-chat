import xFetch from './xFetch';

export async function login(user) {
  return xFetch('http://localhost:3000/backend/login'+JSON.parse(),{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
}

export async function register(user) {
  return xFetch('http://localhost:3000/backend/register',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
}
