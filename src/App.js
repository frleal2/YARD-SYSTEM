import './index.css';
import {useState} from 'react';
import {v4 as uuidv4} from 'uuid';
import Header from './components/Header';
import Cars from './pages/Cars';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Sell from './pages/Sell';
import Dictionary from './pages/Dictionary';
import Definition from './pages/Definition';


function App() {
  return(
    <BrowserRouter>
      <Header>
        <Routes>
          <Route path ='/cars' element = {<Cars />} />
          <Route path ='/sell' element = {<Sell />} />
          <Route path = '/dictionary' element = {<Dictionary />}/>
          <Route path = '/definition' element = {<Definition/>} />
        </Routes>
      </Header>
    </BrowserRouter>
  );
}

export default App;
