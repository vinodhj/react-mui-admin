import { useParams } from 'react-router-dom';

function DeleteTeam() {
  const { id } = useParams();

  return (
    <div>
      <h1>Team Member Delete</h1>
      <p>Details for Registered ID: {id}</p>
    </div>
  );
}

export default DeleteTeam;
