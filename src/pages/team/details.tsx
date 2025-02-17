import { useParams } from 'react-router-dom';

function TeamDetails() {
  const { id } = useParams();

  return (
    <div>
      <h1>Team Member Details</h1>
      <p>Details for Registered ID: {id}</p>
    </div>
  );
}

export default TeamDetails;
