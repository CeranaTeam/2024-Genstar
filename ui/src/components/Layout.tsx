import { LayoutRouteProps } from 'react-router-dom';

const Layout: React.FC<LayoutRouteProps> = ({ children }) => {
  return (
    <>
      <div>
        <h1 className='text-3xl font-bold text-gray-800 py-2 px-4 border-b'>MediCopilot: 病例撰寫副駕駛</h1>
      </div>
      <div className='px-4 max-w-[1000px]'>
        {children}
      </div>
    </>
  );
}

export default Layout;
