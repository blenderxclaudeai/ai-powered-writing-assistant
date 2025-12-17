import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import AuthLayout from '../../components/auth/AuthLayout';

const GoogleIcon = () => (
    <svg className="w-5 h-5 mr-3" viewBox="0 0 48 48">
        <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039L38.804 9.196C34.661 5.6 29.63 3.5 24 3.5C11.3 3.5 1.5 13.3 1.5 26S11.3 48.5 24 48.5c11.4 0 20.5-8.5 20.5-19.5c0-1.5-.131-2.9-.389-4.417z" />
        <path fill="#FF3D00" d="M6.306 14.691c-2.222 4.341-2.222 9.473 0 13.814l-4.9-3.864C.057 20.841.057 17.159 1.406 10.827l4.9 3.864z" />
        <path fill="#4CAF50" d="M24 48.5c5.337 0 10.222-1.897 14.018-5.186l-4.9-3.865C30.68 41.517 27.424 43.5 24 43.5c-4.933 0-9.22-2.52-11.455-6.4H7.028v4.9C11.196 45.459 17.268 48.5 24 48.5z" />
        <path fill="#1976D2" d="M43.611 20.083L43.593 20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l4.9 3.864C40.923 34.437 43.5 29.6 43.5 24c0-1.5-.131-2.9-.389-4.417z" />
    </svg>
);

const GitHubIcon = () => (
    <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.03-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-10.27.544 1.378.201 2.397.099 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
    </svg>
);

const SignInPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
        } else {
            navigate('/dashboard');
        }
        setLoading(false);
    };
    
    const handleOAuthSignIn = async (provider: 'google' | 'github') => {
        setError(null);
        const { error } = await supabase.auth.signInWithOAuth({ 
            provider,
            options: {
                redirectTo: `${window.location.origin}/dashboard`
            }
        });
        if (error) {
            setError(error.message);
        }
    }

    return (
        <AuthLayout>
            <div className="flex flex-col gap-8 bg-slate-800/60 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-slate-700">
                <div className="text-center">
                    <h2 className="text-3xl font-bold">Welcome Back</h2>
                    <p className="text-slate-400 mt-2">
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-indigo-400 hover:underline font-semibold">
                           Sign Up 
                        </Link>
                    </p>
                </div>

                {/* Social Auth */}
                <div className="flex flex-col gap-4">
                    <button onClick={() => handleOAuthSignIn('google')} className="flex items-center justify-center w-full bg-white text-slate-800 font-semibold py-2.5 px-4 rounded-lg hover:bg-slate-200 transition-colors duration-200">
                        <GoogleIcon/>
                        Sign in with Google
                    </button>
                     <button onClick={() => handleOAuthSignIn('github')} className="flex items-center justify-center w-full bg-slate-700 text-white font-semibold py-2.5 px-4 rounded-lg hover:bg-slate-600 transition-colors duration-200">
                        <GitHubIcon/>
                        Sign in with GitHub
                    </button>
                </div>

                {/* Divider */}
                <div className="flex items-center">
                    <hr className="w-full border-slate-600" />
                    <span className="px-4 text-slate-400 font-semibold">OR</span>
                    <hr className="w-full border-slate-600" />
                </div>

                {/* Sign In Form */}
                <form onSubmit={handleSignIn} className='flex flex-col gap-4'>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-slate-300">Email</label>
                        <input 
                            type="email" 
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='you@example.com'
                            className='w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg focus:ring-indigo-500 focus:border-indigo-500' 
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-slate-300">Password</label>
                        <input 
                            type="password" 
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='••••••••'
                            className='w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg focus:ring-indigo-500 focus:border-indigo-500' 
                            required
                        />
                    </div>
                    <div className='text-right'>
                         <Link to="/forgot-password" className="text-sm text-indigo-400 hover:underline font-semibold">
                           Forgot Password?
                        </Link>
                    </div>

                    {error && <p className="text-red-400 text-center text-sm">{error}</p>}

                    <button 
                        type="submit" 
                        disabled={loading}
                        className='w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                        {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>
            </div>
        </AuthLayout>
    );
};

export default SignInPage;
