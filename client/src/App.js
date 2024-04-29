import { Route, Routes} from 'react-router-dom';
import './App.css';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Home from './components/Home';

function App() {
  return (
    <div className="App">
      <Routes>
        
        
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        

        
        
      </Routes>
    </div>
  );
}

export default App;
