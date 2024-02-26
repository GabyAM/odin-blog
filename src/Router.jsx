import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from './Home';
import App from './App';

export function Router() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Home></Home>
        },
        {
            path: 'posts',
            element: <App></App>
        }
    ]);

    return <RouterProvider router={router}></RouterProvider>;
}