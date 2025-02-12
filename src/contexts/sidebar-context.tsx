import { useState, createContext, FC, ReactNode, Dispatch, SetStateAction, useMemo } from 'react';
import MyProSidebar from '../components/my-pro-sidebar';

export interface SidebarContextProps {
  sidebarBackgroundColor?: string;
  setSidebarBackgroundColor: Dispatch<SetStateAction<string | undefined>>;
  sidebarImage: boolean;
  setSidebarImage: Dispatch<SetStateAction<boolean>>;
  sidebarRTL: boolean;
  setSidebarRTL: Dispatch<SetStateAction<boolean>>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

interface MyProSidebarProviderProps {
  children: ReactNode;
}

export const MyProSidebarProvider: FC<MyProSidebarProviderProps> = ({ children }) => {
  const [sidebarRTL, setSidebarRTL] = useState<boolean>(false);
  const [sidebarBackgroundColor, setSidebarBackgroundColor] = useState<string | undefined>(undefined);
  const [sidebarImage, setSidebarImage] = useState<boolean>(false);

  const contextValue = useMemo(
    () => ({
      sidebarBackgroundColor,
      setSidebarBackgroundColor,
      sidebarImage,
      setSidebarImage,
      sidebarRTL,
      setSidebarRTL,
    }),
    [sidebarBackgroundColor, sidebarImage, sidebarRTL]
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
