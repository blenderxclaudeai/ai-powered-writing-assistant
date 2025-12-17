import { useAuth } from '../contexts/AuthContext';

const DashboardPage = () => {
    const { user, signOut } = useAuth();

    return (
        <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-4xl text-center bg-slate-800 p-8 rounded-lg shadow-lg">
                <h1 className="text-4xl font-bold mb-4">Welcome to the Dashboard</h1>
                <p className="text-slate-300 mb-2">You are logged in as:</p>
                <p className="text-indigo-400 font-mono bg-slate-900 inline-block px-3 py-1 rounded-md mb-8">
                    {user?.email}
                </p>
                <button 
                    onClick={signOut}
                    className='w-full max-w-xs mx-auto py-3 px-4 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-semibold transition-colors duration-200'
                >
                    Sign Out
                </button>
            </div>
        </div>
    );
};

export default DashboardPage;
