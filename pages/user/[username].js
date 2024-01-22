import axios from "axios";
import UserDetails from "../../components/UserDetails";
import Layout from "../../components/Layout";
import Link from "next/link";

const User = ({ user }) => (
  <Layout>
    <div>
      <Link href="/">
        <div className="goBack">
          <i className="fas fa-arrow-left"></i>
        </div>
      </Link>
      <h1>User Details</h1>
      <UserDetails user={user} />
    </div>
  </Layout>
);

export async function getServerSideProps({ params }) {
  const response = await axios.get(
    `https://api.github.com/users/${params.username}`
  );
  const user = response.data;

  return {
    props: {
      user,
    },
  };
}

export default User;
