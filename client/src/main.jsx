console.log("Client: main.jsx loaded");
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, Navigate, RouterProvider, } from "react-router-dom";
import Root from './Layout/Root';
import Home from './Pages/HomePage/Home';
import Dashboard from './Pages/Dashboard/Dashboard';
import Register from './Pages/Register/Register';
import Login from './Pages/Login/Login';
import ScholarshipsDetails from './Pages/ScholarshipsDetails/ScholarshipsDetails';
import AllScholarships from './Pages/AllScholarshipsPage/AllScholarships';
import MockAuthProvider from './Context/MockAuthProvider';
import { ToastContainer } from 'react-toastify';
import PrivateRoute from './Context/PrivateRoute';
import AddScholarships from './Pages/Dashboard/Admin/AddScholarships';
import ManageScholarships from './Pages/Dashboard/Admin/ManageScholarships';
import Profile from './Pages/Dashboard/Admin/Profile';
import ManageApplications from './Pages/Dashboard/Admin/ManageApplications';
import AllUser from './Pages/Dashboard/Admin/AllUser';
import ManageReviews from './Pages/Dashboard/Admin/ManageReviews';
import AdminRoute from './Context/AdminRoute';
import AuthorizedRoute from './Context/AuthorizedRoute';
import MyApplication from './Pages/Dashboard/User/MyApplication';
import MyReviews from './Pages/Dashboard/User/MyReviews';
import Charts from './Pages/Dashboard/Admin/Charts';
import ErrorPage from './ErrorPage';
import NotFound from './Pages/NotFound';
import AboutUs from './Pages/AboutUs/AboutUs';
import Blog from './Pages/Blog/Blog';
import Resources from './Pages/Resources/Resources';
import ContactUs from './Pages/ContactUs/Contact';
import Pricing from './Pages/Pricing/Pricing';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/all-scholarships',
        element: <AllScholarships />,
      },
      {
        path: '/scholarship-details/:id',
        element: <ScholarshipsDetails />,
      },
      {
        path: '/contact',
        element: <ContactUs />,
      },
      {
        path: '/about',
        element: <AboutUs />,
      },
      {
        path: '/blog',
        element: <Blog />,
      },
      {
        path: '/resources',
        element: <Resources />,
      },
      {
        path: '/pricing',
        element: <Pricing />,
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      }

    ]
  },
  {
    path: '/dashboard',
    element: <PrivateRoute ><Dashboard /></PrivateRoute>,
    errorElement: <ErrorPage />,
    children: [
      // admin routes
      {
        path: '/dashboard',
        element: <Navigate replace to={'profile'} />,
      },
      {
        index: true,
        path: 'profile',
        element: <PrivateRoute><Profile /></PrivateRoute>,
      },
      {
        path: 'add-scholarships',
        element: <AuthorizedRoute><AddScholarships /></AuthorizedRoute>
      },
      {
        path: 'manage-scholarships',
        element: <AuthorizedRoute><ManageScholarships /></AuthorizedRoute>
      },
      {
        path: 'manage-applications',
        element: <AuthorizedRoute><ManageApplications /></AuthorizedRoute>
      },
      {
        path: 'manage-users',
        element: <AdminRoute><AllUser /></AdminRoute>
      },
      {
        path: 'manage-reviews',
        element: <AuthorizedRoute><ManageReviews /></AuthorizedRoute>
      },
      {
        path: 'analytics',
        element: <AdminRoute><Charts /></AdminRoute>,
        loader: async () => {
          try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/all-collections-data`);
            if (!response.ok) {
              throw new Error('Failed to load analytics data');
            }
            return response.json();
          } catch (error) {
            console.error('Loader error:', error);
            return { error: error.message };
          }
        }
      },
      // user route
      {
        path: 'my-application/:id',
        element: <PrivateRoute><MyApplication /></PrivateRoute>
      },
      {
        path: 'my-reviews/:id',
        element: <PrivateRoute><MyReviews /></PrivateRoute>,
        loader: async ({ params }) => {
          try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/my-review/${params.id}`);
            if (!response.ok) {
              throw new Error('Failed to load reviews');
            }
            return response.json();
          } catch (error) {
            console.error('Loader error:', error);
            return { error: error.message };
          }
        }
      }

    ]
  },
  {
    path: '*',
    element: <NotFound></NotFound>
  }
]);

console.log("Client: Router defined, rendering...");
createRoot(document.getElementById('root')).render(
  <MockAuthProvider>
    <QueryClientProvider client={queryClient}>
      <StrictMode>
        <RouterProvider router={router} />
        <ToastContainer />
      </StrictMode>
    </QueryClientProvider>
  </MockAuthProvider>
)
