import React, { useState, useEffect } from 'react';
import {
  Container,
  Title,
  Input,
  Button,
  Select
} from './styled';

export function Post({ cancel, listarFornecedores }) {
  const [novoFornecedor, setNovoFornecedor] = useState({
    nome: '',
    telefone: '',
    email: '',
    endereco: ''
  });
  const [enderecoState, setEnderecoState] = useState([])

  const adicionarNovoFornecedor = async () => {
    try {
      const response = await fetch('http://localhost:5000/fornecedor/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: novoFornecedor.nome,
          telefone: novoFornecedor.telefone,
          email: novoFornecedor.email,
          endereco: novoFornecedor.endereco,
        }),
      });

      if (response.ok) {
        cancel();
        listarFornecedores();
      } else {
        console.error('Erro ao criar o fornecedor.');
      }
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  const getEndereco = async () => {
    try {
      const response = await fetch('http://localhost:5000/enderecos');
      const data = await response.json();
      setEnderecoState(data.dados);
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  useEffect(() => {
    getEndereco();
  },
    []);

  return (
    <Container>
      <Title>Adicionar Novo Fornecedor</Title>
      <Input
        type="text"
        placeholder="Nome do Fornecedor"
        value={novoFornecedor.nome}
        onChange={(e) =>
          setNovoFornecedor({ ...novoFornecedor, nome: e.target.value })
        }
      />
      <Input
        type="text"
        placeholder="Telefone"
        value={novoFornecedor.telefone}
        onChange={(e) =>
          setNovoFornecedor({ ...novoFornecedor, telefone: e.target.value })
        }
      />
      <Input
        type="text"
        placeholder="Email"
        value={novoFornecedor.email}
        onChange={(e) =>
          setNovoFornecedor({ ...novoFornecedor, email: e.target.value })
        }
      />

      <Select
        type="text"
        placeholder="Endereço"
        value={novoFornecedor.endereco}
        onChange={(e) =>
          setNovoFornecedor({ ...novoFornecedor, endereco: e.target.value })
        }
      >
        <option value="">Selecione um endereco</option>
        {enderecoState.map((endereco) => (
          <option key={endereco.endereco_id} value={endereco.endereco_id}>
            {endereco.rua}
          </option>
        ))}
      </Select>
      
      <Button onClick={adicionarNovoFornecedor}>Adicionar Fornecedor</Button>
      <Button onClick={cancel}>Cancelar</Button>
    </Container>
  );
}
