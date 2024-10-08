import { createContext, useState } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  User,
} from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";

interface AuthContextData {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  SignInWithGoogle(): void;
  SignInWithEmailAndPassword(email: string, password: string): void;
}

interface Props {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);
export const AuthProvider = ({ children }: Props) => {
  const loading = false;
  const [user, setUser] = useState<User | null>(null);

  const SignInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((credentials) => {
        setUser(credentials.user);
      })
      .catch((error) => console.log(error));
  };

  const SignInWithEmailAndPassword = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((credentials) => {
        setUser(credentials.user);
      })
      .catch((error) => console.log(error));
  };

  // const SignInWithEmailAndPassword = (email: string, password: string) => {};

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        SignInWithGoogle,
        SignInWithEmailAndPassword,
      }}
    >
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
