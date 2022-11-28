import React from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CharacterList from './CharacterList';
import CharacterEdit from './CharacterEdit';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path='/characters' exact={true} element={<CharacterList/>}/>
        <Route path='/characters/:id' element={<CharacterEdit/>}/>
      </Routes>
    </Router>
  )
}

export default App;
