import LogoutButton from '../../components/auth/LogoutButton';
import { useSession } from '../../hooks/useSession';

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
