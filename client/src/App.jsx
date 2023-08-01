import './App.css';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import MessageForm from './components/MessageForm';
import MessageList from './components/MessageList';
import UserMessages from './components/UserMessages';

function App() {
  return (
    <div className="App">
      <RegistrationForm />
      <LoginForm />
      <MessageForm />
      <MessageList />
      <UserMessages />
    </div>
  );
}

export default App;