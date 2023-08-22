import React, { useState, useEffect } from 'react';
import EditProduto from './update';

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
        <ul>
          {produtos.map((produto, index) => (
            <div key={index}>
              <li>id produto: {produto.produto_id}</li>
              <li>{produto.nome_produto}</li>
              <li>Preço: {produto.preco_unidade}</li>
              <button onClick={() => excluirProduto(produto.produto_id)}>Excluir</button>
              <button onClick={() => iniciarEdicao(produto)}>Editar</button>
            </div>
          ))}
        </ul>
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
