import { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handlePasswordReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setMessage(null);

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/update-password`,
        });

        if (error) {
            setError(error.message);
        } else {
            setMessage('Password reset link has been sent to your email.');
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4">
            <div className="w-full max-w-md mx-auto">
                 <div className="flex flex-col gap-6 bg-slate-800/60 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-slate-700">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Forgot Password?</h2>
                        <p className="text-slate-400 mt-2">
                           Enter your email and we'll send you a link to reset your password.
                        </p>
                    </div>

                    {message ? (
                         <p className="text-green-400 text-center bg-green-900/50 p-4 rounded-lg">{message}</p>
                    ) : (
                        <form onSubmit={handlePasswordReset} className='flex flex-col gap-4'>
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

                            {error && <p className="text-red-400 text-center text-sm">{error}</p>}

                            <button 
                                type="submit" 
                                disabled={loading}
                                className='w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
                            >
                                {loading ? 'Sending...' : 'Send Reset Link'}
                            </button>
                        </form>
                    )}
                     <div className='text-center mt-4'>
                         <Link to="/signin" className="text-sm text-indigo-400 hover:underline font-semibold flex items-center justify-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
                           Back to Sign In
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
