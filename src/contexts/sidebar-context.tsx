import { useState, createContext, ReactNode, Dispatch, SetStateAction, useMemo, FC, useEffect } from 'react';
import MyProSidebar from '../components/sidebar';
import { useTypedLocalStorage } from '../hooks/use-typed-local-storage';

export interface SidebarContextProps {
  sidebarBackgroundColor?: string;
  setSidebarBackgroundColor: Dispatch<SetStateAction<string | undefined>>;
  sidebarImage: boolean;
  setSidebarImage: Dispatch<SetStateAction<boolean>>;
  sidebarRTL: boolean;
  setSidebarRTL: Dispatch<SetStateAction<boolean>>;
  collapsed: boolean;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
  toggled: boolean;
  setToggled: Dispatch<SetStateAction<boolean>>;
}

// Create the context
export const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

interface MyProSidebarProviderProps {
  children: ReactNode;
}

export const MyProSidebarProvider: FC<MyProSidebarProviderProps> = ({ children }) => {
  const [sidebarBackgroundColor, setSidebarBackgroundColor] = useState<string | undefined>(undefined);

  // Use the typed local storage hook for state persistence
  const [sidebarRTL, setSidebarRTL] = useTypedLocalStorage<boolean>('sidebarRTL', false);
  const [sidebarImage, setSidebarImage] = useTypedLocalStorage<boolean>('sidebarImage', true);
  const [collapsed, setCollapsed] = useTypedLocalStorage<boolean>('sidebarCollapsed', false);
  const [toggled, setToggled] = useTypedLocalStorage<boolean>('sidebarToggled', false);

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
      toggled,
      setToggled,
    }),
    [sidebarBackgroundColor, sidebarImage, sidebarRTL, collapsed, toggled]
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
