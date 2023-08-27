import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from '../../modal/modal';
import { Post } from '../post/post';
import { EditFornecedor } from '../update/update';
import axios from 'axios';


export function Fornecedores() {
  const [fornecedores, setFornecedores] = useState([]);
  const [editFornecedor, setEditFornecedor] = useState(null); 
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);

  useEffect(() => {
    listarFornecedores();
  }, []);

  const listarFornecedores = async () => {
    try {
      const response = await fetch('http://localhost:5000/fornecedores'); 
      const data = await response.json();
      setFornecedores(data.dados);
    } catch (error) {
      console.error('Erro:', error);
    }
  };
  
  const salvarEdicao = async (dadosEditados) => {
    try {
      console.log('Fornecedor ID:', editFornecedor.fornecedor_id);
      const response = await fetch('http://localhost:5000/fornecedores/patch', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fornecedor_id: editFornecedor.fornecedor_id,
          nome: dadosEditados.nome_fornecedor,
          telefone: dadosEditados.contato,
          email: dadosEditados.email,
        }),
      });
  
      if (!response.ok) {
        console.error('Error:', response.status, response.statusText);
      } else if (response.status === 201) {
        console.log('Atualizado com sucesso');
        setEditFornecedor(null);
        listarFornecedores(); 
      }
    } catch (error) {
      console.error('Erro:', error);
    }
  };
  
  
  


  const excluirFornecedor = async (fornecedor_id) => {
    try {
      const response = await fetch('http://localhost:5000/forncedores/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fornecedor_id: fornecedor_id }),
      });
      if (response.ok) {
        setFornecedores(fornecedores.filter((fornecedor) => fornecedor.fornecedor_id !== fornecedor_id));
      }

    } catch (error) {
      console.error('Erro:', error);
    }
  };

  const cancelarEdicao = () => {
    setEditFornecedor(null);
  };

  const cancelarCriacao = () => {
    setAddModalIsOpen(false);
  };

  const iniciarEdicao = (fornecedor) => {
    console.log('Iniciar Edição:', fornecedor);
    setEditFornecedor(fornecedor);
    setEditModalIsOpen(true);
  };


  const cadastrarFornecedor = () => {
    setAddModalIsOpen(true);
  };


  return (
    <>
      <div>
        <h2>Lista de fornecedores</h2>
        <button className='btn btn-primary' onClick={cadastrarFornecedor}>Adicionar fornecedor</button>

        <Modal isOpen={addModalIsOpen} setModalOpen={() => setAddModalIsOpen(false)}>
          <Post cancel={cancelarCriacao} />
        </Modal>

        <table className="table table-striped-columns">
          <thead>
            <tr>
              <th scope="col">Nome do Fornecedor</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
          <tbody>
            {fornecedores.map((fornecedor, index) => (
              <tr key={index}>
                <td>{fornecedor.nome}</td>
                <td>{fornecedor.telefone}</td>
                <td>{fornecedor.email}</td>
                <td>
                  <button className="btn btn-secondary btn-lg" onClick={() => excluirFornecedor(fornecedor.fornecedor_id)}>Excluir</button>
                  <button className="btn btn-primary btn-lg" onClick={() => iniciarEdicao(fornecedor)}>Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {editFornecedor && (
        <Modal
          isOpen={editModalIsOpen}
          setModalOpen={() => setEditModalIsOpen(false)}
        >
          <EditFornecedor
            fornecedor={editFornecedor}
            onSave={salvarEdicao}
            onCancel={cancelarEdicao}
          />
        </Modal>
      )}

    </>
  );
}
