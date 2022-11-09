import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  const [mkCharacters, setMkCharacters] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)

    fetch('api/mk11/characters')
      .then(response => response.json())
      .then(data => {
        setMkCharacters(data)
        setLoading(false)
      })
  }, []);

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="App-intro">
          <h2>Mk List</h2>
          {mkCharacters.map(mkCharacter =>
            <div key={mkCharacter.id}>
              {mkCharacter.name}
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
