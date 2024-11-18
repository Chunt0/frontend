import { NavLink } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import ConnectButton from './ConnectButton';
import { useWallet } from '@solana/wallet-adapter-react';

const NavBar = () => {
  const linkClass = ({ isActive }: { isActive: boolean }) => isActive ? 'bg-yellow-400 text-black hover:bg-gray-900 hover:text-white px-3 py-2' : 'bg-black text-white hover:bg-yellow-400 hover:text-black px-3 py-2';

  return (
    <nav className="bg-indigo-700 border-b border-indigo-500">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
            <NavLink className="flex flex-shrink-0 items-center mr-4" to="/">
              <img className="h-10 w-auto" src={logo} alt="ppl" />
              <span className="hidden md:block text-white text-2xl font-bold ml-2">ppl</span>
            </NavLink>
            <div className="md:ml-auto">
              <div className='flex space-x-2'>
                <NavLink to='/generator' className={linkClass}>Generator</NavLink>
                <NavLink to='/meme-board' className={linkClass}>Memeboard</NavLink>
                <NavLink to='/shuffler' className={linkClass}>Shuffler</NavLink>
                <ConnectButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
