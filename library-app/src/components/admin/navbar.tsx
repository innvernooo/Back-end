'use client';
import { HiMenuAlt1 } from 'react-icons/hi';

export default function Navbar() {
  return (
    <nav className='sticky navbar w-full top-0 z-50 bg-yellow-400'>
      <label
        htmlFor='my-drawer-4'
        aria-label='open sidebar'
        className='btn btn-square btn-ghost drawer-button'
      >
        <HiMenuAlt1 />
      </label>
      <div className='px-4 ml-auto'>
        <div className='flex items-center gap-3'>
          <span className='text-white font-semibold'>POPCAT CARTOON</span>
          <div className='w-10 h-10 bg-pink-500 rounded-full bg-[url(/popcat.jpg)] bg-contain'></div>
        </div>
      </div>
    </nav>
  );
}