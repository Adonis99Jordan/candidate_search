import { useEffect, useState } from 'react';
import { Candidate } from '../interfaces/Candidate.interface';

const SavedCandidates = () => {
const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

useEffect(() => {
  const storedCandidates = localStorage.getItem('savedCandidates');
  if (storedCandidates) {
    setSavedCandidates(JSON.parse(storedCandidates));
  }
}, [])
  return (
    <div>
      <h1>Potential Candidates</h1>
      {savedCandidates.length > 0 ? (
         savedCandidates.map((candidate, index) => (
          <div key={index}>
            <img src={candidate.avatar_url} alt={candidate.name} />
            <h2>{candidate.name}</h2>
            <p>Username: {candidate.login}</p>
            <p>Location: {candidate.location}</p>
            <p>Email: {candidate.email}</p>
            <p>Company: {candidate.company}</p>
            <a href={candidate.html_url}>GitHub Profile</a>
          </div>
        ))
      ) : (
        <p>No candidates have been accepted</p>
      )}
    </div>
  );
};

export default SavedCandidates;
