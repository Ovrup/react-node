import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import 'devextreme/dist/css/dx.light.css';
import TableComponent from './components/tableComponent';
import GraphComponent from './components/graphComponent';
import Header from './components/header';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

function App() {

  return (
    <div>
      <Header />
      <div>
        <Routes>
          <Route path='/' element={<TableComponent />} />
          <Route path='/table' element={<TableComponent />} />
          <Route path='/graph' element={<GraphComponent />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
