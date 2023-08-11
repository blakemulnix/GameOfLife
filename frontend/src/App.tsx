import './App.css';
import { Account } from './components/Account';
import Status from './components/Status';
import Login from './components/Login';
import Signup from './components/Signup';
import Settings from './components/Settings';

function App() {
  return (
    <Account>
      <Status />
      <Login />
      <Signup />
      <Settings />
    </Account>
  );
}

export default App;
