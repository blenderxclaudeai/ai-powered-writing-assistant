import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import SignInPage from './pages/auth/SignInPage';
import SignUpPage from './pages/auth/SignUpPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import UpdatePasswordPage from './pages/auth/UpdatePasswordPage';
import DashboardPage from './pages/Dashboard';
import { FC, ReactNode } from 'react';

// A wrapper for routes that require authentication.
const ProtectedRoute: FC<{ children: ReactNode }> = ({ children }) => {
    const { user } = useAuth();
    return user ? <>{children}</> : <Navigate to="/signin" />;
};

// A wrapper for auth routes that redirects if the user is already logged in.
const AuthRoute: FC<{ children: ReactNode }> = ({ children }) => {
    const { user } = useAuth();
    return user ? <Navigate to="/dashboard" /> : <>{children}</>;
};

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Navigate to="/signin" />} />
                    <Route path="/signin" element={<AuthRoute><SignInPage /></AuthRoute>} />
                    <Route path="/signup" element={<AuthRoute><SignUpPage /></AuthRoute>} />
                    <Route path="/forgot-password" element={<AuthRoute><ForgotPasswordPage /></AuthRoute>} />
                    <Route path="/update-password" element={<UpdatePasswordPage />} />

                    <Route 
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <DashboardPage />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;