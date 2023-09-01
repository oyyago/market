import React, { useState,useEffect } from 'react';
import {
  EditProdutoContainer,
  EditProdutoHeader,
  EditProdutoLabel,
  EditProdutoInput,
  EditProdutoButton,
  EditProdutoCancelButton,
  Select
} from './style';

function EditProduto({ produto, onSave, onCancel }) {
  const [nome_produto, setNomeProduto] = useState(produto.nome_produto);
  const [preco_unidade, setPrecoUnidade] = useState(produto.preco_unidade);
  const [fornecedor_id, setFornecedor_id] = useState(produto.fornecedor_id);
  const [categoria_id, setCategoria_id] = useState(produto.categoria_id);


  const handleSave = () => {
    onSave({ nome_produto, preco_unidade, fornecedor_id,categoria_id });
  };

  const [fornecedorState, setFornecedorState] = useState([]);
  const [categoriaState, setCategoriaState] = useState([])


  const getFornecedor = async () => {
    try {
      const response = await fetch('http://localhost:5000/fornecedores');
      const data = await response.json();
      setFornecedorState(data.dados);
    } catch (error) {
      console.error('Erro:', error);
    };
  };

  useEffect(() => {
    getFornecedor();
  },
    []);


    const getCategoria = async () => {
      try {
        const response = await fetch('http://localhost:5000/categorias');
        const data = await response.json();
        setCategoriaState(data.dados);
      } catch (error) {
        console.error('Erro:', error);
      };
    };
  
    useEffect(() => {
      getCategoria();
    },
      []);


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
      <Select
        placeholder="Fornecedor"
        value={fornecedor_id}
        onChange={(e) => setFornecedor_id(e.target.value)}
      >
        <option value="">Selecione um fornecedor</option>
        {fornecedorState.map((fornecedor) => (
          <option key={fornecedor.fornecedor_id} value={fornecedor.fornecedor_id}>
            {fornecedor.nome}
          </option>
        ))}
      </Select>

      <Select
        placeholder="Categoria"
        value={categoria_id}
        onChange={(e) => setCategoria_id(e.target.value)}
      >
        <option value="">Selecione uma Categoria</option>
        {categoriaState.map((categoria) => (
          <option key={categoria.categoria_id} value={categoria.categoria_id}>
            {categoria.nome_categoria}
          </option>
        ))}
      </Select>

      <EditProdutoButton onClick={handleSave}>Salvar</EditProdutoButton>
      <EditProdutoCancelButton onClick={onCancel}>Cancelar</EditProdutoCancelButton>
    </EditProdutoContainer>
  );
}

export default EditProduto;
