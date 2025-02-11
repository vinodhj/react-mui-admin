import { useState, createContext, FC, ReactNode, Dispatch, SetStateAction, useMemo } from 'react';
import MyProSidebar from '../components/MyProSidebar';

export interface SidebarContextProps {
  sidebarBackgroundColor?: string;
  setSidebarBackgroundColor: Dispatch<SetStateAction<string | undefined>>;
  sidebarImage?: string;
  setSidebarImage: Dispatch<SetStateAction<string | undefined>>;
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
  const [sidebarImage, setSidebarImage] = useState<string | undefined>(undefined);

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
