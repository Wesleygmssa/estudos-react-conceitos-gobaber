import React from 'react';
import Singin from './pages/Singin';
import SinUp from './pages/SingUp'
import GlobalStyle from './styles/global';

const App: React.FC = () => {
  return (
    <>
      <Singin />
      <GlobalStyle />
    </>
  )
}

export default App;
