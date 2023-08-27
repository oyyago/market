import React, { useState } from 'react';
import {
  EditFornecedorContainer,
  EditFornecedorHeader,
  EditFornecedorLabel,
  EditFornecedorInput,
  EditFornecedorButton,
  EditFornecedorCancelButton,
} from './style';

export function EditFornecedor({ fornecedor, onSave, onCancel }) {
  const [nome_fornecedor, setNomeFornecedor] = useState(fornecedor.nome);
  const [contato, setContato] = useState(fornecedor.telefone);
  const [email, setEmail] = useState(fornecedor.email);

  const handleSave = () => {
    console.log('Clicou em Salvar');
    console.log('Nome:', nome_fornecedor);
    console.log('Contato:', contato);
    console.log('Email:', email);
    onSave({ nome_fornecedor, contato, email });
  };
  

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
      
      <EditFornecedorButton onClick={handleSave}>Salvar</EditFornecedorButton>
      <EditFornecedorCancelButton onClick={onCancel}>Cancelar</EditFornecedorCancelButton>
    </EditFornecedorContainer>
  );
}

