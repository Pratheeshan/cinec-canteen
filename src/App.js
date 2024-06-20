import logo from './logo.svg';
import './App.css';
import Header from './components/header/Header';
import Footer from "./components/footer/Footer";
import RegisterPage from './pages/register/Register';

function App() {
  return (
    <div className="App">
      <div className="App">
      <Header />
      <RegisterPage/>
      <Footer/>
    </div>
    </div>
  );
}

export default App;
