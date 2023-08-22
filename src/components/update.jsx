import React, { useState } from 'react';

function EditProduto({ produto, onSave, onCancel }) {
  const [nome_produto, setNomeProduto] = useState(produto.nome_produto);
  const [preco_unidade, setPrecoUnidade] = useState(produto.preco_unidade);

  const handleSave = () => {
    onSave({ nome_produto, preco_unidade });
  };

  return (
    <div>
      <h2>Editar Produto</h2>
      <label htmlFor="nome">Nome:</label>
      <input
        type="text"
        id="nome"
        value={nome_produto}
        onChange={(e) => setNomeProduto(e.target.value)}
      />
      <br />
      <label htmlFor="preco">Preço:</label>
      <input
        type="text"
        id="preco"
        value={preco_unidade}
        onChange={(e) => setPrecoUnidade(e.target.value)}
      />
      <br />
      <button onClick={handleSave}>Salvar</button>
      <button onClick={onCancel}>Cancelar</button>
    </div>
  );
}

export default EditProduto;