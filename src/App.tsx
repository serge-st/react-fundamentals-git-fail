import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Navbar from './components/UI/Navbar/Navbar';
import About from './pages/About';
import Posts from './pages/Posts';
import './styles/App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/posts">
          <Posts />
        </Route>
        <Redirect to="/posts"/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
