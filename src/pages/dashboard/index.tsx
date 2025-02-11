import LogoutButton from '../../components/auth/logout-button';
import { useSession } from '../../hooks/use-session';

function Dashboard() {
  const { session } = useSession();

  return (
    <div>
      <h2>Welcome to Dashboard - {session.adminName} </h2>
      <LogoutButton />
    </div>
  );
}

export default Dashboard;
