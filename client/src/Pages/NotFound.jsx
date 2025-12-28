import { Link } from 'react-router-dom';
import errorImg from '../assets/404.png';

const NotFound = () => {
    return (
        <div className='flex bg-white h-[100vh] pt-10 justify-center items-center flex-col text-center'>
            <img className='max-h-96' src={errorImg} alt="Page not found" />
            <div className='flex flex-col gap-5'>
                <p className='text-5xl font-bold'>OOPS!</p>
                <p className='text-3xl font-semibold'>Page not found. <br /> Use this Button to go back to Home.</p>
                <Link to={'/'}>
                    <button className='btn transition duration-300 bg-black text-white hover:bg-green-600 border border-green-600/20 px-7'>
                        Go Back To Home
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default NotFound;