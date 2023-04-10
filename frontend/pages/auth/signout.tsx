import { useEffect } from "react";
import { useRouter } from "next/router";
import { gql, useMutation, useApolloClient } from "@apollo/client";
import { setJwtToken, setRefreshToken } from "../../lib/auth";
import { Spin } from "antd";

const SignOutMutation = gql`
  mutation SignOutMutation {
    signout {
      ok
    }
  }
`;

function SignOut() {
  const client = useApolloClient();
  const router = useRouter();
  const [signOut] = useMutation(SignOutMutation);

  useEffect(() => {
    // Clear the JWT and refresh token so that Apollo doesn't try to use them
    setJwtToken("");
    setRefreshToken("");
    // Hit the signout endpoint to clear the fingerprint cookie
    // Tell Apollo to reset the store
    // Finally, redirect the user to the home page
    signOut().then(() => {
      client.resetStore().then(() => {
        router.push("/auth/signin");
      });
    });
  }, [signOut, router, client]);

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Spin tip="Keluar dari sistem, mohon tunggu..." />
    </div>
  );
}

export default SignOut;
