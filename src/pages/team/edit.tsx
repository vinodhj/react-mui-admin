import { useParams } from 'react-router-dom';

function EditTeam() {
  const { id } = useParams();

  return (
    <div>
      <h1>Team Member Edit</h1>
      <p>Details for Registered ID: {id}</p>
    </div>
  );
}

export default EditTeam;
