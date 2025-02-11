import { useContext } from 'react';
import { SidebarContext, SidebarContextProps } from '../contexts/sidebar-context';

export const useSidebarContext = (): SidebarContextProps => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebarContext must be used within a MyProSidebarProvider');
  }
  return context;
};
