import { Outlet } from 'react-router-dom';
import { MyProSidebarProvider } from '../contexts/sidebar-context';
import Topbar from '../components/top-bar';

function MainLayout() {
  return (
    <MyProSidebarProvider>
      <div style={{ height: '100%', width: '100%' }}>
        <header>
          <Topbar />
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </MyProSidebarProvider>
  );
}

export default MainLayout;
