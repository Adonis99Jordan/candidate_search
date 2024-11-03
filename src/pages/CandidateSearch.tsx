import React, {useState, useEffect} from 'react';
import { searchGithub } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [candidate, setCandidate] =useState<Candidate | null>(null);
  const [savedCandidates, setSavedCandidates] =useState<Candidate []>([]);
  const [index, setIndex] =useState(0);

  useEffect(() => {
    fetchCandidate();
  }, [index]);
  
  const fetchCandidate = async () => {
    const data = await searchGithub();
    setCandidate(data);
  };

  const saveCandidate = () => {
    if (candidate) {
      const updateSavedCandidates = [...savedCandidates, candidate];
      setSavedCandidates (updateSavedCandidates);
      localStorage.setItem('savedCandidates', JSON.stringify(updateSavedCandidates));
      setIndex(index + 1);
    }
  };

  const skipCandidate = () => {
    setIndex(index + 1);
  };

  return (
    <div>
      {candidate ? (
        <div>
          <img src={candidate.avatar_url} alt={candidate.name} />
          <h2>{candidate.name}</h2>
          <p>Username: {candidate.username}</p>
          <p>Location: {candidate.location}</p>
          <p>Email: {candidate.email}</p>
          <p>Company: {candidate.company}</p>
          <a href={candidate.html_url}>GitHub Profile</a>
          <button onClick={saveCandidate}>+</button>
          <button onClick={skipCandidate}>-</button>
        </div>
      ) : (
        <p>No more candiates available</p>
      )}
    </div>
  );
};

export default CandidateSearch;
