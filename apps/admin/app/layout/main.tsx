import React from 'react';
import Header from '~/components/header';
const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="flex flex-col w-screen h-screen">
            <Header />
            <div className='flex-1 px-10'>
                {children}
            </div>
        </div>
    );
};

export default MainLayout;
