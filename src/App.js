import React from 'react';
import { Route, Routes, BrowserRouter} from 'react-router-dom';
import UserInfo from './components/UserInfo';
import UserList from './components/UserList';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={ <UserList/>} />
      <Route exact path="/user/:id" element={ <UserInfo/> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
