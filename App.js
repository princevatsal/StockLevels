import React from 'react';
import Navigation from './src/navigation';
import {UserProvider} from './src/context/userContext';

const App = () => {
  return (
    <UserProvider>
      <Navigation />
    </UserProvider>
  );
};

export default App;
