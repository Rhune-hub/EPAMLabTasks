import './styles/App.css';
import UserDetails from './components/UserDetails';
import Content from './components/Content';

function App({user}) {
  return (
    <div className="App">
      <UserDetails user={user}/>
      <Content content={user.content}/>
    </div>
  );
}

export default App;
