import React, { useState, useEffect } from 'react';

export function Delete() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const listarProdutos = async () => {
      try {
        const response = await fetch('http://localhost:5000/produtos');
        const data = await response.json();
        setProdutos(data.dados);
      } catch (error) {
        console.error('Erro:', error);
      }
    };


    listarProdutos();
  }, []);

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
            </div>
          ))}
        </ul>
      </div>
    </>
  );
}