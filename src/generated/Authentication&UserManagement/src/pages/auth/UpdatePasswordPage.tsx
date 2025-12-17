import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';

const UpdatePasswordPage = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [hasToken, setHasToken] = useState(false)

    useEffect(() => {
      // Supabase redirects with the access token in the URL fragment
      // This effect checks for the token and sets state accordingly
      const hash = window.location.hash;
      if (hash.includes('access_token')) {
        setHasToken(true);
      } else {
        setError("No password reset token found. Please request a new link.")
      }

      const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'PASSWORD_RECOVERY') {
           // This event is now handled by the presence of a token in the URL
           // updateUser can be called directly
        }
      })
  
      return () => {
        subscription.unsubscribe();
      }
    }, [])

    const handleUpdatePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setMessage(null);

        const { error } = await supabase.auth.updateUser({ password });

        if (error) {
            setError(error.message);
        } else {
            setMessage('Your password has been updated successfully. Redirecting to sign in...');
            setTimeout(() => navigate('/signin'), 3000);
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4">
            <div className="w-full max-w-md mx-auto">
                 <div className="flex flex-col gap-6 bg-slate-800/60 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-slate-700">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Set a New Password</h2>
                        <p className="text-slate-400 mt-2">
                           Enter your new password below.
                        </p>
                    </div>
                    
                    {message && <p className="text-green-400 text-center bg-green-900/50 p-4 rounded-lg">{message}</p>}
                    {error && <p className="text-red-400 text-center bg-red-900/50 p-4 rounded-lg">{error}</p>}
                    
                    {(hasToken && !message) && (
                        <form onSubmit={handleUpdatePassword} className='flex flex-col gap-4'>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-slate-300">New Password</label>
                                <input 
                                    type="password" 
                                    id="password"
                                    value={password}
                                     minLength={6}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder='••••••••'
                                    className='w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg focus:ring-indigo-500 focus:border-indigo-500' 
                                    required
                                />
                            </div>

                            <button 
                                type="submit" 
                                disabled={loading}
                                className='w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
                            >
                                {loading ? 'Updating...' : 'Update Password'}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UpdatePasswordPage;
