import { useEffect, useState } from "react";
import axios from "axios";
import UserList from "../components/UserList";
import Layout from "../components/Layout";
import styles from "../styles/UserList.module.css";
import Spinner from "@/components/Spinner";

const Home = ({ initialUsers }) => {
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://api.github.com/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = () => {
    // Filter users based on the search term
    const filteredUsers = initialUsers.filter((user) =>
      user.login.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setUsers(filteredUsers);
  };

  const handleClearFilter = () => {
    setSearchTerm("");
    setUsers(initialUsers);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);

    const filteredUsers = initialUsers.filter((user) =>
      user.login.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setUsers(filteredUsers);
  };

  return (
    <Layout>
      <div>
        <h1>Github Users</h1>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={handleInputChange}
          />
          <button onClick={handleSearch}>Search</button>
          <button onClick={handleClearFilter}>Clear Filter</button>
        </div>
        {loading ? <Spinner /> : <UserList users={users} />}
      </div>
    </Layout>
  );
};

export async function getServerSideProps() {
  const response = await axios.get("https://api.github.com/users");
  const initialUsers = response.data;

  return {
    props: {
      initialUsers,
    },
  };
}

export default Home;
