import React, { useState } from 'react';
import {
  Container,
  Title,
  Input,
  Button
} from './styled';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export function PostVenda({ cancel, listarVendas }) {
  const [novaVenda, setNovaVenda] = useState({
    data_venda: '',
    funcionario_id: '',
    cliente_id: '',
    valor_total: '',
    produtos: {}
  });

  const [startDate, setStartDate] = useState(new Date());

  const adicionarNovaVenda = async () => {
    try {
      const response = await fetch('http://localhost:5000/vendas', {
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

  return (
    <Container>
      <Title>Adicionar Nova Venda</Title>
      <DatePicker
        selected={startDate}
        onChange={handleDataVendaChange}
        dateFormat="yyyy-MM-dd"
      />


      <Select
        type="number"
        placeholder="funcionario ID"
        value={novoProduto.fornecedor_id}
        onChange={(e) =>
          setNovoProduto({ ...novoProduto, fornecedor_id: e.target.value })
        }
      >
        <option value="">Selecione um fornecedor</option>
        {fornecedorState.map((fornecedor) => (
          <option key={fornecedor.fornecedor_id} value={fornecedor.fornecedor_id}>
            {fornecedor.nome}
          </option>
        ))}
      </Select>
      
      <Input
        type="text"
        placeholder="ID do Cliente"
        value={novaVenda.cliente_id}
        onChange={(e) => setNovaVenda({ ...novaVenda, cliente_id: e.target.value })}
      />
      <Input
        type="text"
        placeholder="Valor Total"
        value={novaVenda.valor_total}
        onChange={(e) => setNovaVenda({ ...novaVenda, valor_total: e.target.value })}
      />
      <Button onClick={adicionarNovaVenda}>Adicionar Venda</Button>
      <Button onClick={cancel}>Cancelar</Button>
    </Container>
  );
}
