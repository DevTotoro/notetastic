import { createBrowserRouter, redirect } from 'react-router-dom';

import RootLayout from './components/RootLayout';

import Error from './pages/Error';
import Login from './pages/Login';
import Register from './pages/Register';
import Notes from './pages/Notes';
import Todos from './pages/Todos';

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <Error />,
    loader: () => redirect('/login'),
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    element: <RootLayout />,
    children: [
      {
        path: '/notes',
        element: <Notes />,
      },
      {
        path: '/todos',
        element: <Todos />,
      },
    ],
  },
]);

export default router;
