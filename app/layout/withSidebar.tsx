import React from 'react';
import Header from '~/components/header';
import { AppSidebar } from '~/components/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '~/components/ui/sidebar';



const WithSidebar: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="flex flex-col w-screen h-screen">
            <SidebarProvider>
                <AppSidebar />
                <div className='flex-1'>
                    <Header 
                        sidebarTrigger={<SidebarTrigger />}
                    />
                    {children}
                </div>
            </SidebarProvider>
        </div>
    );
};

export default WithSidebar;
