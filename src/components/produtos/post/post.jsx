import React, { useState, useEffect } from 'react';
import {
  Container,
  Title,
  Input,
  Button,
} from './styled';

export function Post({ cancel, isOpen, recarregarProdutos }) { // Adicione recarregarProdutos como propriedade
  console.log('isOpen:', isOpen);

  const [novoProduto, setNovoProduto] = useState({
    nome_produto: '',
    preco_unidade: "",
    fornecedor_id: "",
    categoria_id: "",
    estoque: "",
  });
  const [fornecedorState, setFornecedorState] = useState([]);

  const adicionarNovoProduto = async () => {
    try {
      const response = await fetch('http://localhost:5000/produtos/insert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: novoProduto.nome_produto,
          preco: novoProduto.preco_unidade,
          fornecedor: novoProduto.fornecedor_id,
          categoria: novoProduto.categoria_id,
          estoque: novoProduto.estoque,
        }),
      });

      if (response.ok) {
        cancel();
        recarregarProdutos();
      } else {
        console.error('Erro ao criar o produto.');
      }
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  const getFornecedor = async () => {
    try {
      const response = await fetch('http://localhost:5000/fornecedores');
      const data = await response.json();
      setFornecedorState(data.dados);
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  useEffect(() => {
    getFornecedor();
  },
    []);

  return (
    <Container style={{ display: isOpen ? 'block' : 'none' }}>
      <Title>Adicionar Novo Produto</Title>
      <Input
        type="text"
        placeholder="Nome do Produto"
        value={novoProduto.nome_produto}
        onChange={(e) =>
          setNovoProduto({ ...novoProduto, nome_produto: e.target.value })
        }
      />
      <Input
        type="number"
        placeholder="Preço por Unidade"
        value={novoProduto.preco_unidade}
        onChange={(e) =>
          setNovoProduto({ ...novoProduto, preco_unidade: e.target.value })
        }
      />
<select
  type="number"
  placeholder="Fornecedor ID"
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
      </select>
      <Input
        type="number"
        placeholder="Categoria ID"
        value={novoProduto.categoria_id}
        onChange={(e) =>
          setNovoProduto({ ...novoProduto, categoria_id: e.target.value })
        }
      />
      <Input
        placeholder="Estoque"
        value={novoProduto.estoque}
        onChange={(e) =>
          setNovoProduto({ ...novoProduto, estoque: e.target.value })
        }
      />
      <Button onClick={adicionarNovoProduto}>Adicionar Produto</Button>
      <Button onClick={cancel}>Cancelar</Button>
    </Container>
  );
}
