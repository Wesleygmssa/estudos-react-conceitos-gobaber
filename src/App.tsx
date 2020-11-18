import React from 'react';
import Singin from './pages/Singin';
import SinUp from './pages/SingUp'
import GlobalStyle from './styles/global';


import AppProvider from './hooks';

const App: React.FC = () => {
  return (
    <>

      <AppProvider>
        <Singin />
      </AppProvider>
      <GlobalStyle />
    </>
  );
}

export default App;
