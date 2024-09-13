// import Navbar from './components/Navbar';
import { BrowserRouter as Router } from 'react-router-dom';
import './styles/App.css';
import AppRoutes from './routes';

function App() {
  return (
    <Router>
      <AppRoutes/>
    </Router>
  );
}

export default App;
