import { useRouteError, Link } from 'react-router-dom';
import errorImg from './assets/404.png';

const ErrorPage = () => {
    const error = useRouteError();
    console.error(error);

    // Check if this is a 404 (not found) error vs a loader/api error
    const isNotFoundError = error?.status === 404 ||
        error?.message?.includes('route') ||
        error?.message?.includes('match') ||
        error?.data?.error?.includes('route');

    return (
        <div className='flex bg-white h-[100vh] pt-10 justify-center items-center flex-col text-center'>
            <img className='max-h-96' src={errorImg} alt="Error" />
            <div className='flex flex-col gap-5'>
                <p className='text-5xl font-bold'>OOPS!</p>
                {isNotFoundError ? (
                    <>
                        <p className='text-3xl font-semibold'>Page not found. <br /> Use this Button to go back to Home.</p>
                        <Link to={'/'}>
                            <button className='btn transition duration-300 bg-black text-white hover:bg-green-600 border border-green-600/20 px-7'>
                                Go Back To Home
                            </button>
                        </Link>
                    </>
                ) : (
                    <>
                        <p className='text-3xl font-semibold'>Something went wrong. <br /> Please try again or go back to Home.</p>
                        <div className="flex gap-3 justify-center">
                            <button
                                className='btn transition duration-300 bg-black text-white hover:bg-green-600 border border-green-600/20 px-7'
                                onClick={() => window.location.reload()}
                            >
                                Refresh Page
                            </button>
                            <Link to={'/'}>
                                <button className='btn transition duration-300 bg-black text-white hover:bg-green-600 border border-green-600/20 px-7'>
                                    Go Back To Home
                                </button>
                            </Link>
                        </div>
                        {error?.message && (
                            <p className="text-gray-500 text-sm mt-4">Error: {error.message}</p>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default ErrorPage;