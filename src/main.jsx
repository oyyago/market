import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Root } from './components/root'
import ErrorPage from "./components/error";
import { Produtos } from "./components/produtos/produtos/produtos"
import Index from "./components";
import { Fornecedores } from "./components/forncedores/tabela/fornecedores";
import { Funcionarios } from "./components/funcionarios/funcionarios/funcionarios";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,

    children: [
      { index: true, element: <Index /> },
      {
        path: "produtos/",
        element: <Produtos />,
      }, {
        path: "fornecedores/",
        element: <Fornecedores />,
      },
      {
        path: "funcionarios/",
        element: <Funcionarios />,
      },

    ],

  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
