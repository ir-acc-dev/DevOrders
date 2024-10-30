import './App.css'
import MainList from "./components/MainList.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./components/HomePage.jsx";
import React from "react";
import HeaderComponent from "./components/HeaderComponent.jsx";

function App() {

  return (
      <BrowserRouter>
          <HeaderComponent />
          <Routes>
              <Route path='/' element={<HomePage />}></Route>
              <Route path='/mainlist' element={<MainList />}></Route>
          </Routes>
      </BrowserRouter>
  )
}

export default App
