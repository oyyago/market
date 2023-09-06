// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Observe que estamos usando Routes em vez de Switch
import { Main } from './components/main';
import { Produtos } from './components/produtos/produtos/produtos';
import { Fornecedores } from './components/forncedores/tabela/fornecedores';
import { Funcionarios } from './components/funcionarios/funcionarios/funcionarios';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} >
        <Route path="produtos" element={<Produtos />} />
        <Route path="fornecedores" element={<Fornecedores />} />
        <Route path="funcionarios" element={<Funcionarios />} />

      </Route>
      </Routes>
    </Router>
  );
}

export default App;
