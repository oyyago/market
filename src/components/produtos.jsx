import React, { useState, useEffect } from 'react';
import EditProduto from './update';
import 'bootstrap/dist/css/bootstrap.min.css';

export function Delete() {
  const [produtos, setProdutos] = useState([]);
  const [editProduto, setEditProduto] = useState(null);

  useEffect(() => {
    listarProdutos();
  }, []);

  const listarProdutos = async () => {
    try {
      const response = await fetch('http://localhost:5000/produtos');
      const data = await response.json();
      setProdutos(data.dados);
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  const excluirProduto = async (produto_id) => {
    try {
      const response = await fetch('http://localhost:5000/produtos/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: produto_id }),
      });
      if (response.ok) {
        setProdutos(produtos.filter((produto) => produto.produto_id !== produto_id));
      }
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  const iniciarEdicao = (produto) => {
    setEditProduto(produto);
  };

  const salvarEdicao = async (dadosEditados) => {
    try {
      const response = await fetch('http://localhost:5000/produtos/patch', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: dadosEditados.nome_produto,
          preco: dadosEditados.preco_unidade,
          id: editProduto.produto_id,
        }),
      });
      if (response.ok) {
        setEditProduto(null);
        listarProdutos();
      }
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  const cancelarEdicao = () => {
    setEditProduto(null);
  };

  return (
    <>
<div>
  <h2>Lista de Produtos</h2>
  <table class="table table-striped-columns">
    <thead>
      <tr>
        <th scope="col">Nome do Produto</th>
        <th scope="col">Preço</th>
        <th scope="col">Fornecedor</th>
        <th  scope="col">Categoria</th>
        <th scope="col"> Ações</th>
      </tr>
    </thead>
    <tbody>
      {produtos.map((produto, index) => (
        <tr key={index}>
          <td>{produto.nome_produto}</td>
          <td>{produto.preco_unidade}</td>
          <td>{produto.nome}</td>
          <td>{produto.nome_categoria}</td>
          <td>
            <button class="btn btn-secondary btn-lg" onClick={() => excluirProduto(produto.produto_id)}>Excluir</button>
            <button class="btn btn-primary btn-lg" onClick={() => iniciarEdicao(produto)}>Editar</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


      {editProduto && (
        <EditProduto
          produto={editProduto}
          onSave={salvarEdicao}
          onCancel={cancelarEdicao}
        />
      )}
    </>
  );
}
