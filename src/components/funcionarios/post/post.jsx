import React, { useState, useEffect } from 'react';
import {
  Container,
  Title,
  Input,
  Button,
  Select
} from './styled';
import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';



export function Post({ cancel, isOpen, recarregarFuncionarios }) {
  console.log('isOpen:', isOpen);

  const [novoFuncionario, setNovoFuncionario] = useState({
    nome: '',
    telefone: "",
    email: "",
    cargo: "",
    valor_por_hora: "",
    data_contratacao: "",
    endereco_id: "",
  });
  const [enderecoState, setEnderecoState] = useState([]);
  const [startDate, setStartDate] = useState(new Date());


  const adicionarNovoFuncionario = async () => {
    try {
      const response = await fetch('http://localhost:5000/funcionarios/insert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: novoFuncionario.nome,
          telefone: novoFuncionario.telefone,
          email: novoFuncionario.email,
          cargo: novoFuncionario.cargo,
          valor_por_hora: novoFuncionario.valor_por_hora,
          data_contratacao: novoFuncionario.data_contratacao,
          endereco_id: novoFuncionario.endereco_id,
        }),
      });

      if (response.ok) {
        cancel();
        recarregarFuncionarios();
      } else {
        console.error('Erro ao criar o funcionário.');
      }
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  const getEnderecos = async () => {
    try {
      const response = await fetch('http://localhost:5000/enderecos');
      const data = await response.json();
      setEnderecoState(data.dados);
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  useEffect(() => {
    getEnderecos();
  }, []);

  const handleDataVendaChange = (date) => {
    function dataAtualFormatada(data) {
      var dia = data.getDate().toString(),
        diaF = (dia.length === 1) ? '0' + dia : dia,
        mes = (data.getMonth() + 1).toString(),
        mesF = (mes.length === 1) ? '0' + mes : mes,
        anoF = data.getFullYear();
      return anoF + "-" + mesF + "-" + diaF;
    }

    let dataFormatada = dataAtualFormatada(date);
    setStartDate(date);
    setNovoFuncionario({ ...novoFuncionario, data_contratacao: dataFormatada });
  };


  return (
    <Container style={{ display: isOpen ? 'block' : 'none' }}>
      <Title>Adicionar Novo Funcionário</Title>
      <Input
        type="text"
        placeholder="Nome do Funcionário"
        value={novoFuncionario.nome}
        onChange={(e) =>
          setNovoFuncionario({ ...novoFuncionario, nome: e.target.value })
        }
      />
      <Input
        type="text"
        placeholder="Telefone"
        value={novoFuncionario.telefone}
        onChange={(e) =>
          setNovoFuncionario({ ...novoFuncionario, telefone: e.target.value })
        }
      />
      <Input
        type="text"
        placeholder="Email"
        value={novoFuncionario.email}
        onChange={(e) =>
          setNovoFuncionario({ ...novoFuncionario, email: e.target.value })
        }
      />
      <Input
        type="text"
        placeholder="Cargo"
        value={novoFuncionario.cargo}
        onChange={(e) =>
          setNovoFuncionario({ ...novoFuncionario, cargo: e.target.value })
        }
      />
      <Input
        type="text"
        placeholder="Salário"
        value={novoFuncionario.valor_por_hora}
        onChange={(e) =>
          setNovoFuncionario({ ...novoFuncionario, valor_por_hora: e.target.value })
        }
      />
      <DatePicker
        closeOnScroll={(e) => e.target === document}
        selected={startDate}
        onChange={handleDataVendaChange}
        dateFormat="yyyy-MM-dd"
      />
      <Select
        placeholder="Endereco"
        value={novoFuncionario.endereco_id}
        onChange={(e) =>
          setNovoFuncionario({ ...novoFuncionario, endereco_id: e.target.value })
        }
      >
        <option value="">Selecione um endereco</option>
        {enderecoState.map((endereco) => (
          <option key={endereco.endereco_id} value={endereco.endereco_id}>
            {endereco.rua} {endereco.bairro}
          </option>
        ))}
      </Select>
      <Button onClick={adicionarNovoFuncionario}>Adicionar Funcionário</Button>
      <Button onClick={cancel}>Cancelar</Button>
    </Container>
  );
}
