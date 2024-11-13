import { useAuth0 } from '@auth0/auth0-react';
import React, { useState } from 'react';
import axios from 'axios';


import logo from './logo.svg';
import './App.css';
import LoginButton from './login';
import LogoutButton from './logout';
import Profile from './profile';

function App() {
  //doha

  // ((((((((((((((((((answer of my queston experiment; if we wanted to catch the first access token that was seen on network tab
  //import { useState } from 'react'; add top
  // const [accessToken, setAccessToken] = useState()
  // if (window.location.href.includes("/code=kjhdfihsdf?accessToken=lakjsdf&idToken=asdf")) {
  //   const url = new URL(window.location.href)
  //   setAccessToken(url.searchParams.accessToken ?? '')
  //   localStorage.setItem("accessToken", accessToken)
  //   localStorage.getItem("accessToken")
  // })))))))))))))))))))))))

  //first e ekbar load hobe page ta. log in er pore abar load hobe.
  //every load ei nicher part ta run hobe

  const { getAccessTokenSilently, isAuthenticated } = useAuth0();  //using hook to get ready to receive token
  const [token, setToken] = useState("");

  const getToken = async () => {
    if (isAuthenticated) {
      const token = await getAccessTokenSilently();
      console.log("token", token);
      setToken(token)
    }
  }
  getToken()

  //doha

  //MINE TESTING with axios XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  const [response1, setResponse1] = useState('');
  const [response2, setResponse2] = useState('');
  const [response3, setResponse3] = useState('');
  const [response4, setResponse4] = useState('');

  // Function to send GET request and update response
  const handleButtonClick1 = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setResponse1(res.data);  // Store the response data in state
    } catch (error) {
      // setResponse('Error fetching data');
      setResponse1(`Error: ${error.message}`);  // Show the error message from the error object
      console.error('Error details:', error);
    }
  };

  const handleButtonClick2 = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/test/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setResponse2(res.data);  // Store the response data in state
    } catch (error) {
      // setResponse('Error fetching data');
      setResponse2(`Error: ${error.message}`);  // Show the error message from the error object
      console.error('Error details:', error);
    }
  };

  const handleButtonClick3 = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/private/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setResponse3(res.data);  // Store the response data in state
    } catch (error) {
      // setResponse('Error fetching data');
      setResponse3(`Error: ${error.message}`);  // Show the error message from the error object
      console.error('Error details:', error);
    }
  };

  const handleButtonClick4 = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/private-scoped', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setResponse4(res.data);  // Store the response data in state
    } catch (error) {
      // setResponse('Error fetching data');
      setResponse4(`Error: ${error.message}`);  // Show the error message from the error object
      console.error('Error details:', error);
    }
  };
  //

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <LoginButton />
        <LogoutButton />
        <Profile />
      </header>

      {/* viewing token */}
      <div>
        <table className='mytable'>
          <thead>
            <tr>
              <th>
                TOKEN
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{token}</td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* viewing api call response */}
      <div>
        <table className='mytable'>
          <thead>
            <tr>
              <th colSpan={2}>
                AXIOS TEST
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <button onClick={handleButtonClick1}>Call api public</button>
              </td>
              <td>
                {response1}
              </td>
            </tr>

            <tr>
              <td>
                <button onClick={handleButtonClick2}>Call api public env test</button>
              </td>
              <td>
                {response2}
              </td>
            </tr>

            <tr>
              <td>
                <button onClick={handleButtonClick3}>Call api private</button>
              </td>
              <td>
                {response3}
              </td>
            </tr>

            {isAuthenticated && <tr>
              <td>
                <button onClick={handleButtonClick4}>Call api pvt scoped</button>
              </td>
              <td>
                {response4} {/* Display the response inside the second td */}
              </td>
            </tr>}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default App;
