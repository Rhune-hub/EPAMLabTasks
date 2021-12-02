import React from 'react';
import './styles/App.css';
import ErrorBoundary from './components/ErrorBoundary'
import Content from './components/Content';

function App({children}) {
  return (
    <div className="app">
      <ErrorBoundary>
        <Content>{children}</Content>
      </ErrorBoundary>
    </div>
  );
}

export default App;
