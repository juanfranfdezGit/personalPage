import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './pages/Home'
import About from './pages/About'
import ProjectTemplate from './pages/ProjectTemplate'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/projects/:id',
    element: <ProjectTemplate />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}