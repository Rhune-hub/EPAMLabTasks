import './styles/App.css';
import UserDetails from './components/UserDetails';
import ScrollButton from './components/ScrollButton';

function App() {
  return (
    <div className="app">
      <ScrollButton direction="bottom"/>
      <UserDetails/>
      <ScrollButton direction="top"/>
    </div>
  );
}

export default App;
