import { useState, createContext, FC, ReactNode, Dispatch, SetStateAction, useMemo, useEffect } from 'react';
import MyProSidebar from '../components/my-pro-sidebar';

export interface SidebarContextProps {
  sidebarBackgroundColor?: string;
  setSidebarBackgroundColor: Dispatch<SetStateAction<string | undefined>>;
  sidebarImage: boolean;
  setSidebarImage: Dispatch<SetStateAction<boolean>>;
  sidebarRTL: boolean;
  setSidebarRTL: Dispatch<SetStateAction<boolean>>;
  collapsed: boolean;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
}

// Create the context
export const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

interface MyProSidebarProviderProps {
  children: ReactNode;
}

export const MyProSidebarProvider: FC<MyProSidebarProviderProps> = ({ children }) => {
  const [sidebarBackgroundColor, setSidebarBackgroundColor] = useState<string | undefined>(undefined);

  // Initialize sidebarRTL from localStorage (default: false)
  const [sidebarRTL, setSidebarRTL] = useState<boolean>(() => {
    const stored = localStorage.getItem('sidebarRTL');
    return stored !== null ? JSON.parse(stored) : false;
  });

  // Initialize sidebarImage from localStorage (default: true)
  const [sidebarImage, setSidebarImage] = useState<boolean>(() => {
    const stored = localStorage.getItem('sidebarImage');
    return stored !== null ? JSON.parse(stored) : true;
  });

  // Initialize collapsed state from localStorage (default: false)
  const [collapsed, setCollapsed] = useState<boolean>(() => {
    const stored = localStorage.getItem('sidebarCollapsed');
    return stored !== null ? JSON.parse(stored) : false;
  });

  // Persist sidebarImage changes to localStorage
  useEffect(() => {
    localStorage.setItem('sidebarImage', JSON.stringify(sidebarImage));
  }, [sidebarImage]);

  // Persist sidebarRTL changes to localStorage
  useEffect(() => {
    localStorage.setItem('sidebarRTL', JSON.stringify(sidebarRTL));
  }, [sidebarRTL]);

  // Persist collapsed changes to localStorage
  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', JSON.stringify(collapsed));
  }, [collapsed]);

  const contextValue = useMemo(
    () => ({
      sidebarBackgroundColor,
      setSidebarBackgroundColor,
      sidebarImage,
      setSidebarImage,
      sidebarRTL,
      setSidebarRTL,
      collapsed,
      setCollapsed,
    }),
    [sidebarBackgroundColor, sidebarImage, sidebarRTL, collapsed]
  );

  return (
    <SidebarContext.Provider value={contextValue}>
      <div
        style={{
          display: 'flex',
          flexDirection: sidebarRTL ? 'row-reverse' : 'row',
        }}
      >
        <MyProSidebar />
        {children}
      </div>
    </SidebarContext.Provider>
  );
};
