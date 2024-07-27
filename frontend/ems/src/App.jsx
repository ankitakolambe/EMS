import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Home';
import ReadUser from './ReadUser';
import UpdateUser from './UpdateUser';

function App() {
  return (
    <div>
      <header className="bg-blue-600 text-white p-4">
        <h2 className="text-4xl font-bold text-center">EMPLOYEE MANAGEMENT SYSTEM</h2>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/readuser/:id" element={<ReadUser />} />
        <Route path="/updateuser/:id" element={<UpdateUser />} />
      </Routes>
    </div>
  );
}

export default App;
