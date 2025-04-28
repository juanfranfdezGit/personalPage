import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Animation from './pages/Animation'
import About from './pages/About'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Animation />,
  },
  {
    path: '/about',
    element: <About />,
  },
]);

export default function App() {

  return (

    <RouterProvider router={router} />
  
  )
}