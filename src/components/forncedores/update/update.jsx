import React, { useState, useEffect } from 'react';
import {
  EditFornecedorContainer,
  EditFornecedorHeader,
  EditFornecedorLabel,
  EditFornecedorInput,
  EditFornecedorButton,
  EditFornecedorCancelButton,
  Select
} from './style';

export function EditFornecedor({ fornecedor, onSave, onCancel }) {
  const [nome_fornecedor, setNomeFornecedor] = useState(fornecedor.nome);
  const [contato, setContato] = useState(fornecedor.telefone);
  const [email, setEmail] = useState(fornecedor.email);
  const [endereco_id, setEndereco_id] = useState(fornecedor.endereco_id);

  const handleSave = () => {
    console.log('Clicou em Salvar');
    console.log('Nome:', nome_fornecedor);
    console.log('Contato:', contato);
    console.log('Email:', email);
    console.log('endereco_id', endereco_id);
    onSave({ nome_fornecedor, contato, email, endereco_id });
  };

  const [enderecoState, setEnderecoState] = useState([])


  const getEndereco = async () => {
    try {
      const response = await fetch('http://localhost:5000/enderecos');
      const data = await response.json();
      setEnderecoState(data.dados);
    } catch (error) {
      console.error('Erro:', error);
    };
  };

  useEffect(() => {
    getEndereco();
  },
    []);
    
  return (
    <EditFornecedorContainer>
      <EditFornecedorHeader>Editar Fornecedor</EditFornecedorHeader>

      <EditFornecedorLabel htmlFor="nome">Nome:</EditFornecedorLabel>
      <EditFornecedorInput
        type="text"
        id="nome"
        value={nome_fornecedor}
        onChange={(e) => setNomeFornecedor(e.target.value)}
      />
      <EditFornecedorLabel htmlFor="contato">Contato:</EditFornecedorLabel>
      <EditFornecedorInput
        type="text"
        id="contato"
        value={contato}
        onChange={(e) => setContato(e.target.value)}
      />      <EditFornecedorLabel htmlFor="contato">email:</EditFornecedorLabel>
      <EditFornecedorInput
        type="text"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Select
        placeholder="Endereço"
        value={endereco_id}
        onChange={(e) => setEndereco_id(e.target.value)}
      >
        <option value="">Selecione um endereco</option>
        {enderecoState.map((endereco) => (
          <option key={endereco.endereco_id} value={endereco.endereco_id}>
            {endereco.rua}
          </option>
        ))}
      </Select>
      <EditFornecedorButton onClick={handleSave}>Salvar</EditFornecedorButton>
      <EditFornecedorCancelButton onClick={onCancel}>Cancelar</EditFornecedorCancelButton>
    </EditFornecedorContainer>
  );
}

