import React, { useState, useEffect } from 'react';
import EditProduto from '../update/update';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AiOutlinePlus, AiFillEdit, AiFillDelete }  from  'react-icons/ai'
import { Modal } from '../../modal/modal';
import { Post } from '../post/post';

export function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [editProduto, setEditProduto] = useState(null);
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);

  useEffect(() => {
    listarProdutos();
  }, []);

  const listarProdutos = async () => {
    try {
      const response = await fetch('http://localhost:5000/produtos');
      const data = await response.json();
      setProdutos(data.dados);
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  const excluirProduto = async (produto_id) => {
    try {
      const response = await fetch('http://localhost:5000/produtos/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: produto_id }),
      });
      if (response.ok) {
        setProdutos(produtos.filter((produto) => produto.produto_id !== produto_id));
      }
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  const salvarEdicao = async (dadosEditados) => {
    try {
      const response = await fetch('http://localhost:5000/produtos/patch', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: dadosEditados.nome_produto,
          preco: dadosEditados.preco_unidade,
          fornecedor_id:dadosEditados.fornecedor_id,
          categoria_id:dadosEditados.categoria_id,
          id: editProduto.produto_id,

        }),

      });
      if (response.ok) {
        setEditProduto(null);
        listarProdutos();
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

  const iniciarEdicao = (produto) => {
    setEditProduto(produto);
    setEditModalIsOpen(true);
  };

  const cadastrarProduto = () => {
    setAddModalIsOpen(true);
  };

  return (
    <>
      <div>
        <h2>Lista de Produtos</h2>
        <button className='btn btn-primary' style={{margin:"10px 0px 20px 0px "}} onClick={cadastrarProduto}>Adicionar produto <AiOutlinePlus/></button>

        <Modal isOpen={addModalIsOpen} setModalOpen={setAddModalIsOpen}>
          <Post cancel={cancelarCriacao} isOpen={addModalIsOpen} recarregarProdutos={listarProdutos} />
        </Modal>


        <table className="table">
          <thead>
            <tr>
              <th scope="col">Nome do Produto</th>
              <th scope="col">Preço</th>
              <th scope="col">Fornecedor</th>
              <th scope="col">Categoria</th>
              <th scope="col">Estoque</th>
              <th scope="col"> Ações</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((produto, index) => (
              <tr key={index}>
                <td>{produto.nome_produto}</td>
                <td>R$: {produto.preco_unidade}</td>
                <td>{produto.nome}</td>
                <td>{produto.nome_categoria}</td>
                <td>{produto.estoque}</td>
                <td>
                  <button style={{marginRight:"10px"}} className="btn btn-primary" onClick={() => iniciarEdicao(produto)}><AiFillEdit/></button>
                  <button  className="btn btn-danger" onClick={() => excluirProduto(produto.produto_id)}><AiFillDelete /> </button>
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
            produto={editProduto}
            onSave={salvarEdicao}
            onCancel={cancelarEdicao}
          />
        </Modal>
      )}
    </>
  );
}
