import styled from 'styled-components'

const Container = styled.div`
  width: 400px;
  height: 400px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Estilização do .center
const Center = styled.div`
  width: 180px;
  height: 60px;
  position: absolute;
`;

// Estilização do .btn
const Button = styled.button`
  width: 180px;
  height: 60px;
  cursor: pointer;
  background: transparent;
  border: 1px solid #91C9FF;
  outline: none;
  transition: 1s ease-in-out;

  &:hover {
    background: #4F95DA;
  }
`;

// Estilização do svg
const Svg = styled.svg`
  position: absolute;
  left: 0;
  top: 0;
  fill: none;
  stroke: #fff;
  stroke-dasharray: 150 480;
  stroke-dashoffset: 150;
  transition: 1s ease-in-out;

  ${Button}:hover & {
    stroke-dashoffset: -480;
  }
`;

exports={Button,Center,Container,Svg,Center}