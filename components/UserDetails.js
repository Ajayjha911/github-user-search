import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/UserDetails.module.css";
import Spinner from "./Spinner";

const UserDetails = ({ user }) => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRepos = async () => {
    try {
      setLoading(true);
      const response = await axios.get(user.repos_url);
      setRepos(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepos();
  }, [user.repos_url]);

  return (
    <React.Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <div className={styles.userDetailsContainer}>
          <div className={styles.leftCard}>
            <img
              src={user.avatar_url}
              alt={user.login}
              className={styles.avatar}
            />
            <h2>{user.name}</h2>
            <p>{user.company}</p>
            <p>{user.bio}</p>
          </div>
          <div className={styles.rightCard}>
            <h3>Repositories: {user.public_repos}</h3>
            <div className={styles.repositories}>
              {repos.map((repo) => (
                <div key={repo.id} className={styles.repositoryCard}>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {repo.name}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default UserDetails;
