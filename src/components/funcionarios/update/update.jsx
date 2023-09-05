import React, { useState, useEffect } from 'react';
import {
  EditFuncionarioContainer,
  EditFuncionarioHeader,
  EditFuncionarioLabel,
  EditFuncionarioInput,
  EditFuncionarioButton,
  EditFuncionarioCancelButton,
  Select
} from './style';

function EditFuncionario({ funcionario, onSave, onCancel }) {
  const [nome, setNome] = useState(funcionario.nome);
  const [telefone, setTelefone] = useState(funcionario.telefone);
  const [email, setEmail] = useState(funcionario.email);
  const [cargo, setCargo] = useState(funcionario.cargo);
  const [valor_por_hora, setValor_por_hora] = useState(funcionario.valor_por_hora);
  const [endereco_id, setEndereco_id] = useState(funcionario);


  const handleSave = () => {
    onSave({ nome, telefone, email, cargo, valor_por_hora, valor_por_hora, endereco_id });
  };

  const [enderecos, setEnderecos] = useState([]);

  const getEnderecos = async () => {
    try {
      const response = await fetch('http://localhost:5000/enderecos');
      const data = await response.json();
      setEnderecos(data.dados);
    } catch (error) {
      console.error('Erro:', error);
    }
  };
  useEffect(() => {
    getEnderecos();
  }, []);


  return (
    <EditFuncionarioContainer>
      <EditFuncionarioHeader>Editar Funcionário</EditFuncionarioHeader>

      <EditFuncionarioLabel htmlFor="nome">Nome:</EditFuncionarioLabel>
      <EditFuncionarioInput
        type="text"
        id="nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <EditFuncionarioLabel htmlFor="telefone">telefone:</EditFuncionarioLabel>
      <EditFuncionarioInput
        type="text"
        id="telefone"
        value={telefone}
        onChange={(e) => setTelefone(e.target.value)}
      />
      <EditFuncionarioLabel htmlFor="email">Email:</EditFuncionarioLabel>
      <EditFuncionarioInput
        type="text"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <EditFuncionarioLabel htmlFor="cargo">Cargo:</EditFuncionarioLabel>
      <EditFuncionarioInput
        type="text"
        id="cargo"
        value={cargo}
        onChange={(e) => setCargo(e.target.value)}
      />
      <EditFuncionarioLabel htmlFor="valor_por_hora">Salário:</EditFuncionarioLabel>
      <EditFuncionarioInput
        type="text"
        id="valor_por_hora"
        value={valor_por_hora}
        onChange={(e) => setValor_por_hora(e.target.value)}
      />

      <Select
        placeholder="Endereco"
        value={endereco_id}
        onChange={(e) => setEndereco_id(e.target.value)}
      >
        <option value="">Selecione um endereco</option>
        {enderecos.map((endereco) => (
          <option key={endereco.endereco_id} value={endereco.endereco_id}>
            {endereco.rua} {endereco.bairro}
          </option>
        ))}
      </Select>

      <EditFuncionarioButton onClick={handleSave}>Salvar</EditFuncionarioButton>
      <EditFuncionarioCancelButton onClick={onCancel}>Cancelar</EditFuncionarioCancelButton>
    </EditFuncionarioContainer>
  );
}

export default EditFuncionario;
