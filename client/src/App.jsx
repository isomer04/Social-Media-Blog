import "./App.css";
import RegistrationForm from "./components/RegistrationForm";
import LoginForm from "./components/LoginForm";
import MessageForm from "./components/MessageForm";
import MessageList from "./components/MessageList";
import UserMessages from "./components/UserMessages";

function App() {
  return (
    <div className="App">
      <RegistrationForm />
      <LoginForm />
      <hr />
      <MessageForm />
      <hr />
      <MessageList />

      <h1>User Messages</h1>
      <UserMessages />
    </div>
  );
}

export default App;
