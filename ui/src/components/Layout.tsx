import { LayoutRouteProps } from 'react-router-dom';
import Navbar from './Navbar';

const Layout: React.FC<LayoutRouteProps> = ({ children }) => {
  return (
    <>
      <div>
        <h1 className='text-3xl font-bold text-gray-800 py-2 px-4 border-b'>MediGuess Assistant</h1>
      </div>
      <Navbar />
      <div className='px-4'>
        {children}
      </div>
    </>
  );
}

export default Layout;
