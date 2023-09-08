import React, { Suspense, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './pages/protectedRoute';
import './scss/App.scss';
import './scss/login.scss';
import Register from './pages/register';
import Login from './pages/login';
import ForgotPassword from './pages/forgotpassword';
import ResetPassword from './pages/resetPassword.jsx';

const Content = React.lazy(() => import('./pages/content'));

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      {isLoading ? (
        <div style={{ position:"absolute", top:"50%", left:"50%",width:"100%", color:"#ffffff"}}>Loading...</div>
      ) : (
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path='/' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/forgotPassword' element={<ForgotPassword />} />
            <Route path='/resetPassword/:id' element={<ResetPassword />} />
            <Route path='/home' element={<PrivateRoute element={<Content />} />} />

          </Routes>
        </Suspense>
      )}
    </Router>
  );
}

export default App;
