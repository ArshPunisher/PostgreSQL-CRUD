import {Routes, Route} from 'react-router-dom'
import AddUser from './pages/AddUser';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import EditDetails from './pages/EditDetails';
import ViewDetails from './pages/ViewDetails';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/add' element={<AddUser/>}/>
        <Route path='/edit/:userId' element={<EditDetails/>}/>
        <Route path='/view/:userId' element={<ViewDetails/>}/>
      </Routes>
    </div>
  );
}

export default App;
