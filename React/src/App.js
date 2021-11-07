import React from 'react';
import './styles/App.css';;

function App({children}) {
  return (
    <div className="app">
      {children}
    </div>
  );
}

export default App;
