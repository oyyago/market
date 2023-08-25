import React, { useState, useEffect } from 'react';
import EditProduto from '../update/update';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-modal';


export function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [editProduto, setEditProduto] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);

  // Função que abre a modal

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
    console.log(produto_id)
  };

  const iniciarEdicao = (produto) => {
    setEditProduto(produto);
    
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


  function abrirModal() {
    setIsOpen(true);
  }

  // Função que fecha a modal
  function fecharModal() {
    setIsOpen(false);
  }

  return (
    <>
<div>
  <h2>Lista de Produtos</h2>
  <table className="table table-striped-columns">
    <thead>
      <tr>
        <th scope="col">Nome do Produto</th>
        <th scope="col">Preço</th>
        <th scope="col">Fornecedor</th>
        <th  scope="col">Categoria</th>
        <th scope="col"> Ações</th>
      </tr>
    </thead>
    <tbody>
      {produtos.map((produto, index) => (
        <tr key={index}>
          <td>{produto.nome_produto}</td>
          <td>{produto.preco_unidade}</td>
          <td>{produto.nome}</td>
          <td>{produto.nome_categoria}</td>
          <td>
            <button className="btn btn-secondary btn-lg" onClick={() => excluirProduto(produto.produto_id)}>Excluir</button>
            <button className="btn btn-primary btn-lg" onClick={() => iniciarEdicao(produto)}>Editar</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


      {editProduto && (
              <Modal
              isOpen={modalIsOpen}
              onRequestClose={fecharModal}
              contentLabel="Modal de exemplo"
            >        <EditProduto
            produto={editProduto}
            onSave={salvarEdicao}
            onCancel={cancelarEdicao}
          />
                        <button onClick={fecharModal}>Fechar</button>
            </Modal>  

      )}
      <button onClick={abrirModal}>Abrir modal</button>

    </>
  );
}
