import { RouterProvider } from 'react-router';
import { Toaster } from 'sonner';
import { router } from './routes';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { verifyToken } from './store/authSlice';
import { RootState, AppDispatch } from './store/store';



export default function App() {
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    // Verify token with server on app startup
    if (token) {
      dispatch(verifyToken());
    }
  }, []);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-right" />
    </>
  );
}
