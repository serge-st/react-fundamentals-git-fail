import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import Navbar from './components/UI/Navbar/Navbar';
import About from './pages/About';
import Posts from './pages/Posts';
import './styles/App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
