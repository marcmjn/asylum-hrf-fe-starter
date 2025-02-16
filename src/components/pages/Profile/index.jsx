import { useAuth0 } from "@auth0/auth0-react";



/**
 * TODO: Ticket 3:
 * Implement authentication using Auth0:
 * - Get the user data from Auth0
 * - Create and style the component
 * - Display the data
 * - Make this page a protected Route
 */
const Profile = () => {
  // TODO: Replace these with functionality from Auth0
const { user, isAuthenticated, isLoading, logout, loginWithRedirect } = useAuth0()

if (isLoading ) {
  return <div className='text-center p-4'>Loading...</div>;
} 

// If the user is not authenticated, show the 404-style error directly
if (!isAuthenticated) {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white">
      <div className="p-6 border border-gray-300 rounded-md shadow-md text-center max-w-md">
        <h1 className="text-2xl font-bold">404: NOT_FOUND</h1>
        <p className="text-gray-600">CODE: <code>NOT_FOUND</code></p>
        <p className="text-gray-600">ID: <code>sfo1::{Math.random().toString(36).substr(2, 12)}</code></p>
        <a 
          href="https://vercel.com/docs/errors/platform-error-codes#not_found" 
          className="mt-4 inline-block text-blue-500 hover:underline border border-blue-500 px-4 py-2 rounded-md"
          > Read our documentation to learn more about this error </a>
        <div className="mt-6 flex flex-col space-y-3">
          <button 
            onClick={() => window.location.href = window.location.origin }
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Home
          </button>
          <button 
            onClick={() => loginWithRedirect() }
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  )
}

//If the user is authenticated, render profile
  return (
    isAuthenticated && (
      <div className="flex flex-col items-center p-6 bg-white shadow-lg rounded-lg w-96 mx-auto mt-10'">
        <img 
          src={user.picture}
          alt={user.name}
          className="w-24 h-24 rounded-full shadow-md"      
        />
        <h2 className="text-xl font-bold mt-4">{user.name}</h2>
        <p className="text-gray-600">{user.email}</p>
        <button 
          onClick={() => logout({ returnTo: window.location.origin})}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Log Out
        </button>
        
      </div>
    )
 );
};

export default Profile;
