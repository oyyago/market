import React, { useState, useEffect } from 'react';
import {
  Container,
  Title,
  Input,
  Button,
  Select
} from './styled';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export function PostVenda({ cancel, listarVendas }) {
  const [novaVenda, setNovaVenda] = useState({
    data_venda: '',
    funcionario_id: '',
    cliente_id: '',
    valor_total: '',
    produtos: []
  });


  const [startDate, setStartDate] = useState(new Date());
  const [funcionariosState, setFuncionariosState] = useState([]);
  const [clientesState, setClientesState] = useState([]);
  const [produtosState, setProdutosState] = useState([]);

  const adicionarNovaVenda = async () => {
    try {
      const response = await fetch('http://localhost:5000/vendas/insert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novaVenda),
      });

      if (response.ok) {
        cancel();
        listarVendas();
      } else {
        console.error('Erro ao criar a venda.');
      }
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  const handleDataVendaChange = (date) => {
    setStartDate(date);
    setNovaVenda({ ...novaVenda, data_venda: date });
  };


  const getFuncionarios = async () => {
    try {
      const response = await fetch('http://localhost:5000/funcionarios');
      const data = await response.json();
      setFuncionariosState(data.dados);
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  useEffect(() => {
    getFuncionarios();
  },
    []);

  const getClientes = async () => {
    try {
      const response = await fetch('http://localhost:5000/clientes');
      const data = await response.json();
      setClientesState(data.dados);
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  useEffect(() => {
    getClientes();
  },
    []);



  const getProdutos = async () => {
    try {
      const response = await fetch('http://localhost:5000/produtos');
      const data = await response.json();
      setProdutosState(data.dados);
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  useEffect(() => {
    getProdutos();
  }, []);

  const adicionarProduto = (produtoId, quantidade) => {
    const novoProduto = {
      produto_id: produtoId,
      quantidade: quantidade
    };

    setNovaVenda({ ...novaVenda, produtos: [...novaVenda.produtos, novoProduto] });
  };

  
  return (
    <Container>
      <Title>Adicionar Nova Venda</Title>
      <DatePicker
        selected={startDate}
        onChange={handleDataVendaChange}
        dateFormat="yyyy-MM-dd"
      />


      <Select
        type="text"
        placeholder="funcionario ID"
        value={novaVenda.funcionario_id}
        onChange={(e) =>
          setNovaVenda({ ...novaVenda, funcionario_id: e.target.value })
        }
      >
        <option value="">Selecione um funcionario</option>
        {funcionariosState.map((funcionario) => (
          <option key={funcionario.funcionario_id} value={funcionario.funcionario_id}>
            {funcionario.nome}
          </option>
        ))}
      </Select>

      <Select
        type="text"
        placeholder="cliente ID"
        value={novaVenda.cliente_id}
        onChange={(e) =>
          setNovaVenda({ ...novaVenda, cliente_id: e.target.value })
        }
      >
        <option value="">Selecione um cliente</option>
        {clientesState.map((cliente) => (
          <option key={cliente.cliente_id} value={cliente.cliente_id}>
            {cliente.nome}
          </option>
        ))}
      </Select>

      <Input
        type="text"
        placeholder="Valor Total"
        value={novaVenda.valor_total}
        onChange={(e) => setNovaVenda({ ...novaVenda, valor_total: e.target.value })}
      />

      <Select
        value={''}
        onChange={(e) => {
          const produtoId = e.target.value;
          const quantidade = prompt('Digite a quantidade:');
          if (quantidade !== null) {
            adicionarProduto(produtoId, parseInt(quantidade, 10));
          }
        }}
      >
        <option value="">Selecione um produto</option>
        {produtosState.map((produto) => (
          <option key={produto.produto_id} value={produto.produto_id}>
            {produto.nome}
          </option>
        ))}
      </Select>
      <ul>
        {novaVenda.produtos.map((produto, index) => (
          <li key={index}>
            Produto: {produto.produto_id}, Quantidade: {produto.quantidade}
          </li>
        ))}
      </ul>

      <Button onClick={adicionarNovaVenda}>Adicionar Venda</Button>
      <Button onClick={cancel}>Cancelar</Button>
    </Container>
  );
}
