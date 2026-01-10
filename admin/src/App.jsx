import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { useEffect, useState } from "react"
import MainLayout from "./layout/MainLayout"
import List from "./pages/List"
import Orders from "./pages/Orders"
import Add from "./pages/Add"

function App() {
  const [token, setToken] = useState(
    localStorage.getItem("token") || ""
  )

  useEffect(() => {
    localStorage.setItem("token", token)
  }, [token])

  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout token={token} setToken={setToken} />,
      children: [
        {
          path: 'add',
          element: <Add token={token} />
        },
        {
          path: 'list',
          element: <List token={token} />
        },
        {
          path: 'orders',
          element: <Orders token={token} />
        },
      ]
    }
  ])

  return <RouterProvider router={router} />
}

export default App
