import React, { useState, useMemo, useEffect } from 'react';
import EditProduto from '../update/update';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from '../../modal/modal';
import { Post } from '../post/post';

export function Funcionarios() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [editProduto, setEditProduto] = useState(null);
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);

  useEffect(() => {
    listarFuncionarios();
  }, []);

  const listarFuncionarios = async () => {
    try {
      const response = await fetch('http://localhost:5000/funcionarios');
      const data = await response.json();
      setFuncionarios(data.dados);
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  const excluirFuncionario = async (funcionario_id) => {
    try {
      const response = await fetch('http://localhost:5000/funcionarios/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: funcionario_id }),
      });
      if (response.ok) {
        setFuncionarios(funcionarios.filter((funcionario) => funcionario.funcionario_id !== funcionario_id));
      }
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  const salvarEdicao = async (dadosEditados) => {
    try {
      const response = await fetch('http://localhost:5000/funcionarios/patch', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: dadosEditados.nome,
          telefone:dadosEditados.telefone,
          email:dadosEditados.email,
          cargo: dadosEditados.cargo,
          valor_por_hora: dadosEditados.valor_por_hora,
          endereco_id:dadosEditados.endereco_id,
          id: editProduto.funcionario_id,
        }),
      });
      if (response.ok) {
        setEditProduto(null);
        listarFuncionarios();
      }
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  const cancelarEdicao = () => {
    setEditProduto(null);
  };

  const cancelarCriacao = () => {
    setAddModalIsOpen(false);
  };

  const iniciarEdicao = (funcionario) => {
    setEditProduto(funcionario);
    setEditModalIsOpen(true);
  };

  const cadastrarFuncionario = () => {
    setAddModalIsOpen(true);
  };

  return (
    <>
      <div>
        <h2>Lista de Funcionários</h2>
        <button className='btn btn-primary' onClick={cadastrarFuncionario}>Adicionar funcionário</button>

        <Modal isOpen={addModalIsOpen} setModalOpen={setAddModalIsOpen}>
          <Post cancel={cancelarCriacao} isOpen={addModalIsOpen} recarregarFuncionarios={listarFuncionarios} />
        </Modal>


        <table className="table table-striped-columns">
          <thead>
            <tr>
              <th scope="col">Nome do Funcionário</th>
              <th scope="col">Valor Hora</th>
              <th scope="col">Cargo</th>
              <th scope="col">telefone</th>
              <th scope="col">data contratação</th>

            </tr>
          </thead>
          <tbody>
            {funcionarios.map((funcionario, index) => (
              <tr key={index}>
                <td>{funcionario.nome}</td>
                <td>R$: {funcionario.valor_por_hora}</td>
                <td>{funcionario.cargo}</td>
                <td>{funcionario.telefone}</td>
                <td>{funcionario.data_contratacao}</td>
                <td>
                  <button className="btn btn-secondary btn-lg btn mr-2" onClick={() => excluirFuncionario(funcionario.funcionario_id)}>Excluir</button>
                  <button className="btn btn-primary btn-lg btn" onClick={() => iniciarEdicao(funcionario)}>Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {editProduto && (
        <Modal
          isOpen={editModalIsOpen}
          setModalOpen={() => setEditModalIsOpen(false)}
        >
          <EditProduto
            funcionario={editProduto}
            onSave={salvarEdicao}
            onCancel={cancelarEdicao}
          />
        </Modal>
      )}
    </>
  );
}