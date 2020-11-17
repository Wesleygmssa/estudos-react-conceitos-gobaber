import React from 'react';
import Singin from './pages/Singin';
import SinUp from './pages/SingUp'
import GlobalStyle from './styles/global';

import { AuthProvider } from './hooks/AuthContext'; //dados pelo contexto



const App: React.FC = () => {
  return (
    <>
      <AuthProvider >{/* tudo que esta dentro do provider tem acesso a variavel global */}
        <Singin />
      </AuthProvider>
      <GlobalStyle />
    </>
  )
}

export default App;
