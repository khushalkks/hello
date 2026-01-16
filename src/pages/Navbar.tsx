import React, { useState } from 'react';

import { Moon, Sun } from "lucide-react";
import { useTheme } from '../hooks/useTheme';


const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  
  return (
    <nav className={`w-full h-16 ${theme === 'dark' ? 'bg-gradient-to-r from-purple-900 via-purple-800 to-indigo-900' : 'bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600'} shadow-lg relative z-50`}>
      <div className='max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8'>
      <div className='flex items-center justify-between h-full'>
        {/* Logo & Brand */}
        <div className='flex items-center space-x-3'>
        <div className={`w-10 h-10 ${theme === 'dark' ? 'bg-white/20' : 'bg-white/30'} rounded-lg flex items-center justify-center backdrop-blur-sm`}>
          <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' />
          </svg>
        </div>
        <h1 className='text-xl font-bold text-white tracking-tight'>
          AI Smart Notebook
        </h1>
        </div>

        {/* Desktop Navigation */}
        <div className='hidden md:flex items-center space-x-1'>
        <NavLink href='/' icon='home' active>
          Home
        </NavLink>
        <NavLink href='/notebooks' icon='book'>
          My Notebooks
        </NavLink>
         
        </div>

        {/* Right Side Actions */}
        <div className='hidden md:flex items-center space-x-4'>
        {/* Upload Button */}
        
         <button
        onClick={toggleTheme}
        className="p-2 rounded-lg hover:bg-white/10 transition"
      >
        {theme === "dark" ? (
        <Sun className="w-5 h-5 text-yellow-300" />
        ) : (
        <Moon className="w-5 h-5 text-white" />
        )}
      </button>


        {/* Notifications */}
        <button className='relative p-2 hover:bg-white/10 rounded-lg transition-colors'>
          <svg className='w-5 h-5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9' />
          </svg>
          <span className='absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full'></span>
        </button>

        {/* User Menu */}
        <div className='relative'>
          <button
          onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          className='flex items-center space-x-3 p-2 hover:bg-white/10 rounded-lg transition-colors'
          >
          <div className='w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center'>
            <span className='text-white text-sm font-bold'>KS</span>
          </div>
          <svg className='w-4 h-4 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
          </svg>
          </button>

          {/* User Dropdown */}
          {isUserMenuOpen && (
          <div className={`absolute right-0 mt-2 w-56 ${theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} rounded-lg shadow-2xl py-2 z-[100] border`}>
            <div className={`px-4 py-3 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
            <p className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Khushal Kumar Sahu</p>
            <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>khushal@example.com</p>
            </div>
            <DropdownItem icon='user'>Profile</DropdownItem>
            <DropdownItem icon='settings'>Settings</DropdownItem>
            <DropdownItem icon='chart'>Statistics</DropdownItem>
            <div className={`border-t my-2 ${theme === 'dark' ? 'border-gray-700' : ''}`}></div>
            <DropdownItem icon='logout' danger>Logout</DropdownItem>
          </div>
          )}
        </div>
        </div>
         

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className='md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors'
          >
            <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              {isMobileMenuOpen ? (
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
              ) : (
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className='md:hidden bg-purple-800 border-t border-purple-600'>
          <div className='px-4 py-3 space-y-2'>
            <MobileNavLink href='/' active>Home</MobileNavLink>
            <MobileNavLink href='/notebooks'>My Notebooks</MobileNavLink>
           
            <div className='border-t border-purple-600 my-2 pt-2'>
              
            </div>
          </div>
        </div>
        
      )}
    
    </nav>
    
  );
};

// Desktop Navigation Link Component
const NavLink = ({ href, icon, children, active = false }: { href: string; icon: string; children: React.ReactNode; active?: boolean }) => {
  const icons: Record<string, React.ReactElement> = {
    home: <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' />,
    book: <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' />,
    file: <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z' />,
    message: <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' />,
  };

  return (
    <a
      href={href}
      className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 ${
        active
          ? 'bg-white/20 text-white font-semibold'
          : 'text-white/80 hover:bg-white/10 hover:text-white'
      }`}
    >
      <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
        {icons[icon]}
      </svg>
      <span className='text-sm'>{children}</span>
    </a>
  );
};

// Mobile Navigation Link Component
const MobileNavLink = ({ href, children, active = false }: { href: string; children: React.ReactNode; active?: boolean }) => {
  return (
    <a
      href={href}
      className={`block px-4 py-2 rounded-lg transition-all ${
        active
          ? 'bg-white/20 text-white font-semibold'
          : 'text-white/80 hover:bg-white/10 hover:text-white'
      }`}
    >
      {children}
    </a>
  );
};

// Dropdown Item Component
const DropdownItem = ({ icon, children, danger = false }: { icon: string; children: React.ReactNode; danger?: boolean }) => {
  const icons: Record<string, React.ReactElement> = {
    user: <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />,
    settings: <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' />,
    chart: <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' />,
    logout: <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1' />,
  };

  return (
    <a
      href='#'
      className={`flex items-center space-x-3 px-4 py-2 transition-colors ${
        danger
          ? 'text-red-600 hover:bg-red-50'
          : 'text-gray-700 hover:bg-gray-50'
      }`}
    >
      <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
        {icons[icon]}
      </svg>
      <span className='text-sm'>{children}</span>
    </a>
    
  );
};

export default Navbar;