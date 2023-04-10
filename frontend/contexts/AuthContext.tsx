import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import * as React from "react";
import jwt from 'jsonwebtoken'
import { getJwtToken } from "../lib/auth";
import { Auth } from "../graphql/types";
import { Spin } from "antd";

interface Props {
  children?: React.ReactNode;
}

type ContextType = {
  setState: React.Dispatch<React.SetStateAction<ContextType["state"]>>;
  state: {};
  data: {
    auth?: Partial<Auth>
  };
  action: {};
};

const initialValues: ContextType = {
  setState: () => {},
  state: {},
  data: {},
  action: {},
};

const context = React.createContext<ContextType>(initialValues);

export const useAuthContext = () => {
  const store = React.useContext(context);
  if (!store) {
    throw new Error("Cannot use `useAuthContext` outside of a AuthProvider");
  }
  return store;
};

const UserQuery = gql`
  query currentUser {
    user {
      id
    }
  }
`;

const Store = () => {
  const router = useRouter();
  const skip = ['/auth/signin', '/auth/signup', '/auth/signout'].includes(router.pathname)
  const [auth, setAuth] = React.useState<Partial<Auth>>()
  React.useEffect(() => {
    const token = getJwtToken()
    if (token) {
      const decodedToken = jwt.decode(token) as jwt.JwtPayload
      if (decodedToken) {
        const authData = decodedToken['https://hasura.io/jwt/claims']['X-Hasura-User-Data'] as string
        const parsedAuthData = JSON.parse(authData) as Partial<Auth>
        setAuth(parsedAuthData)
      }
    }
  }, [router])
  const { error } = useQuery(UserQuery, { skip })
  const [state, setState] = React.useState<ContextType["state"]>(
    initialValues.state
  )
  React.useEffect(() => {
    if (skip) return
    if (error) {
      router.push("/auth/signin")
    }
  }, [router, skip, error])
  return {
    state,
    setState,
    data: {
      auth,
    },
    action: {},
  };
};

export const AuthProvider = (props: Props) => {
  const router = useRouter();
  const auth = Store().data.auth
  const skip = ['/auth/signin', '/auth/signup', '/auth/signout'].includes(router.pathname)
  return (
    <context.Provider value={Store()}>
      <Spin spinning={!auth && !skip}>
        {props.children}
      </Spin>
    </context.Provider>
  )
};
