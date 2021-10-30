import './styles/App.css';
import UserDetails from './components/UserDetails';
import Content from './components/Content';
import ErrorBoundary from './components/ErrorBoundary';
import ScrollButton from './components/ScrollButton';

function App() {
  return (
    <div className="app">
      <ScrollButton direction="bottom"/>
      <UserDetails/>
      <ErrorBoundary>
        <Content/>
      </ErrorBoundary>
      <ScrollButton direction="top"/>
    </div>
  );
}

export default App;
