import React, { useState } from 'react';
export function Post(){

const [novoProduto, setNovoProduto] = useState({ nome_produto: '', preco_unidade: 0, fornecedor_id: 0 ,categoria_id:0,estoque:0});

const adicionarNovoProduto = () => {
  // Fazer uma solicitação POST para a rota do servidor backend
  fetch('http://localhost:5000/produtos/insert', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      nome: novoProduto.nome_produto,
      preco: novoProduto.preco_unidade,
      fornecedor: novoProduto.fornecedor_id,
      categoria: novoProduto.categoria_id,
      estoque: novoProduto.estoque,
    }),
  })
    .then(response => response.json())
    .then(data => {
      console.log(data); 
      //setProdutos([...produtos, data.produto]);
      //setNovoProduto({ nome_produto: '', preco_unidade: 0 });
    })
    .catch(error => {
      console.error('Erro:', error);
    });
};

return (
  <>
    <div>
      <h2>Adicionar Novo Produto</h2>
      <input
        type="text"
        placeholder="Nome do Produto"
        value={novoProduto.nome_produto}
        onChange={(e) => setNovoProduto({ ...novoProduto, nome_produto: e.target.value })}
      />
      <input
        type="number"
        placeholder="Preço por Unidade"
        value={novoProduto.preco_unidade}
        onChange={(e) => setNovoProduto({ ...novoProduto, preco_unidade: e.target.value })}
      />
      <input
        type="number"
        placeholder="fornecedor id"
        value={novoProduto.fornecedor_id}
        onChange={(e) => setNovoProduto({ ...novoProduto, fornecedor_id: e.target.value })}
      />
              <input
        type="number"
        placeholder="categoria id"
        value={novoProduto.categoria_id}
        onChange={(e) => setNovoProduto({ ...novoProduto, categoria_id: e.target.value })}
      />
              <input
        placeholder="estoque id"
        value={novoProduto.estoque}
        onChange={(e) => setNovoProduto({ ...novoProduto, estoque: e.target.value })}
      />
      <button onClick={adicionarNovoProduto}>Adicionar Produto</button>
    </div>
  </>
);
};