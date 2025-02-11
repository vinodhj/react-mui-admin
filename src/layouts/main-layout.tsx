// src/layouts/MainLayout.tsx

import { Outlet } from 'react-router-dom';
import { MyProSidebarProvider } from '../contexts/sidebar-context';
import Topbar from '../components/topbar';

function MainLayout() {
  return (
    <MyProSidebarProvider>
      <div style={{ height: '100%', width: '100%' }}>
        <main>
          <Topbar />
          <Outlet />
        </main>
      </div>
    </MyProSidebarProvider>
  );
}

export default MainLayout;
