import React, { useState } from 'react';
import {
  EditProdutoContainer,
  EditProdutoHeader,
  EditProdutoLabel,
  EditProdutoInput,
  EditProdutoButton,
  EditProdutoCancelButton,
} from './style';

function EditProduto({ produto, onSave, onCancel }) {
  const [nome_produto, setNomeProduto] = useState(produto.nome_produto);
  const [preco_unidade, setPrecoUnidade] = useState(produto.preco_unidade);

  const handleSave = () => {
    onSave({ nome_produto, preco_unidade });
  };

  return (
    <EditProdutoContainer>
      <EditProdutoHeader>Editar Produto</EditProdutoHeader>
      <EditProdutoLabel htmlFor="nome">Nome:</EditProdutoLabel>
      <EditProdutoInput
        type="text"
        id="nome"
        value={nome_produto}
        onChange={(e) => setNomeProduto(e.target.value)}
      />
      <EditProdutoLabel htmlFor="preco">Preço:</EditProdutoLabel>
      <EditProdutoInput
        type="text"
        id="preco"
        value={preco_unidade}
        onChange={(e) => setPrecoUnidade(e.target.value)}
      />
      <EditProdutoButton onClick={handleSave}>Salvar</EditProdutoButton>
      <EditProdutoCancelButton onClick={onCancel}>Cancelar</EditProdutoCancelButton>
    </EditProdutoContainer>
  );
}

export default EditProduto;
