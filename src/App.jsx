import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Main } from './components/main';
import { Produtos } from './components/produtos/produtos/produtos';
import { Fornecedores } from './components/forncedores/tabela/produtos';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/produtos">
          <Produtos />
        </Route>
        <Route path="/fornecedores">
          <Fornecedores />
        </Route>
        <Route path="/">
          <Main />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
