import React from 'react'
import './App.css';
import Header from './components/header/Header';
import Footer from "./components/footer/Footer";
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import routes from './Routes/Routes'

const App = () => {
  return (
    <div className="App">
      <div className="App">
        <Header />
        <BrowserRouter>
          <Routes>
            {routes && routes.data.map((route, i) => {
              return <Route
                index={route.type === "main"}
                path={route.path}
                element={route.component}
                key={i}
              />
            })}
            {/* <Route path="*" element={<PageNotFound />} /> */}
          </Routes>
        </BrowserRouter>
        <Footer />
      </div>
    </div>
  );
}

export default App;
