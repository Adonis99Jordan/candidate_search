import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetchCandidates();
  }, []);

  useEffect(() => {
    setCandidate(candidates[index]);
  }, [index])

  const fetchCandidates = async () => {
    const data = await searchGithub();
    // setCandidate(data);
    const candidates = await Promise.all(
      data.map(async (candidate: Candidate) => {
        const details = await searchGithubUser(candidate.login)
        return { ...candidate, ...details }
      })
    )
    setCandidates(candidates);
    setCandidate(candidates[0]);
    console.log("candidatres", candidates)
  };

  const saveCandidate = () => {
    if (candidate) {
      const updateSavedCandidates = [...savedCandidates, candidate];
      setSavedCandidates(updateSavedCandidates);
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
          <div className='candidate'>
            <img src={candidate.avatar_url} alt={candidate.name} />
            <div>
              <h2>{candidate.name}</h2>
              <p>Username: {candidate.login}</p>
              <p>Location: {candidate.location}</p>
              <p>Email: {candidate.email}</p>
              <p>Company: {candidate.company}</p>
              <a href={candidate.html_url}>GitHub Profile</a>
            </div>
          </div>
          <div className="button-container">
            <button className='skip-button' onClick={skipCandidate}>-</button>
            <button className='save-button' onClick={saveCandidate}>+</button>
          </div>
        </div>

      ) : (
        <p>No more candiates available</p>
      )}
    </div>
  );
};

export default CandidateSearch;
