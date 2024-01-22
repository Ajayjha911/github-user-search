import Link from "next/link";
import styles from "../styles/UserList.module.css";
import Spinner from "./Spinner";

const UserList = ({ users, isLoading }) => (
  <div className={styles.userListContainer}>
    {isLoading ? (
      <Spinner />
    ) : (
      <ul className={styles.userList}>
        {users.map((user) => (
          <li key={user.id} className={styles.userCard}>
            <Link href={`/user/${user.login}`}>
              <img
                src={user.avatar_url}
                alt={user.login}
                className={styles.avatar}
              />
              <div className={styles.userInfo}>
                <p>{user.login}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default UserList;
