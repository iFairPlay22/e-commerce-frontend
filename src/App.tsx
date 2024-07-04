import { Layout } from "./component/Layout/index.tsx";
import { BasketView } from "./views/Basket"
import { CatalogView } from "./views/Catalog"
import { CommandsView } from "./views/Commands"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import 'reflect-metadata';
import 'es6-shim';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <></>,
      },
      {
        path: '/basket',
        element: <BasketView />
      },
      {
        path: '/catalog',
        element: <CatalogView />,
      },
      {
        path: '/past-commands',
        element: <CommandsView />,
      }
    ],
  },
]);

export const App = () => (
  <RouterProvider router={router}/>
)