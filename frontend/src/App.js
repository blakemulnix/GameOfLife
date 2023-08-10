import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import { Account } from './components/Account';
import Status from './components/Status';
import Settings from './components/Settings';

function App() {
  return (
    <Account>
      <Status />
      <Signup />
      <Login />
      <Settings />
    </Account>
  );
}

export default App;
