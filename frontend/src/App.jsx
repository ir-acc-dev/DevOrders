import './App.css'
import MainList from "./components/MainList/MainList.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./components/HomePage/HomePage.jsx";
import React from "react";
import HeaderComponent from "./components/HeaderComponent.jsx";
import ImplementationPage from "./components/ImplementationPage/ImplementationPage.jsx";
import ResourcesPage from "./components/ResourcesPage/ResourcesPage.jsx";

function App() {

  return (
      <BrowserRouter>
          <HeaderComponent />
          <Routes>
              <Route path='/' element={<HomePage />}></Route>
              <Route path='/mainlist' element={<MainList />}></Route>
              <Route path="/implementation" element={<ImplementationPage />}></Route>
              <Route path="/resources" element={<ResourcesPage />}></Route>
          </Routes>
      </BrowserRouter>
  )
}

export default App
