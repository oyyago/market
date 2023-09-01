import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from '../../modal/modal';
import { PostVenda } from '../post/post';

export function Vendas() {
  const [vendas, setVendas] = useState([]);
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);

  useEffect(() => {
    listarVendas();
  }, []);

  const listarVendas = async () => {
    try {
      const response = await fetch('http://localhost:5000/dadosvenda');
      const data = await response.json();
      setVendas(data.dados);
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  const excluirVenda = async (venda_id) => {
    try {
      const response = await fetch(`http://localhost:5000/vendas/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ venda_id: venda_id }),
      });

      if (response.ok) {
        setVendas(vendas.filter((venda) => venda.venda_id !== venda_id));
      }
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  return (
    <>
      <div>
        <h2>Lista de vendas</h2>
        <button className='btn btn-primary' onClick={() => setAddModalIsOpen(true)}>Adicionar venda</button>

        <Modal isOpen={addModalIsOpen} setModalOpen={() => setAddModalIsOpen(false)}>
          <PostVenda listarVendas={listarVendas} />
        </Modal>

        <table className="table table-striped-columns">
          <thead>
            <tr>
              <th scope="col">Nome Produto</th>
              <th scope="col">Data Venda</th>
              <th scope='col'>Funcionário</th>
              <th scope='col'>cliente Nome</th>
              <th scope='col'>Valor Total</th>
            </tr>
          </thead>
          <tbody>
            {vendas.map((venda, index) => (
              <tr key={index}>
                <td>{venda.nome_produto}</td>
                <td>{venda.data_venda}</td>
                <td>{venda.nome_funcionario}</td>
                <td>{venda.nome_cliente}</td>
                <td>{venda.valor_total}</td>

                <td>
                  <button className="btn btn-secondary btn-lg" onClick={() => excluirVenda(venda.venda_id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
