import styled from 'styled-components';

export const EditFornecedorContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
`;

export const EditFornecedorHeader = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

export const EditFornecedorLabel = styled.label`
  display: block;
  margin-bottom: 5px;
`;

export const EditFornecedorInput = styled.input`
  width: 100%;
  padding: 5px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const EditFornecedorButton = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

export const EditFornecedorCancelButton = styled.button`
  background-color: #dc3545;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #c82333;
  }
`;

export const Select = styled.select`
  font-size: 0.9rem;
  padding: 7px 7px;
  margin-right:20px;

`;