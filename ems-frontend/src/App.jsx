import { createBrowserRouter, RouterProvider, Outlet } from 'react-router';
import './App.css'
import Home from './components/Home';
import Footer from './components/Footer';
import Header from './components/Header';
import ListEmployee from './components/ListEmployee';
import AddEmployee from './components/AddEmployee';

function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

// Create the router configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/employees",
        element: <ListEmployee />
      },
      {
        path:"/add-employee",
        element: <AddEmployee />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;