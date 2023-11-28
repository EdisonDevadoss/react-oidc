import axios from 'axios';

async function authToken(token) {
  try {
    const user = await axios.get('http://localhost:5000/verify_token', {
      headers: { Authorization: token }
    });

    return user;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
}

export { authToken };
