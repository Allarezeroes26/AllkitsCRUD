import { createBrowserRouter, RouterProvider } from "react-router-dom"
import MainLayout from "./layout/MainLayout"
import List from "./pages/List"
import Orders from "./pages/Orders"
import Add from "./pages/Add"

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        {
          path: '/add',
          element: <Add />
        },
        {
          path: '/list',
          element: <List />
        },
        {
          path: '/orders',
          element: <Orders />
        },
      ]
    }
  ])

  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App
