import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  onAuthStateChanged,
  User as FirebaseUser,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase-config";
import Loader from "@/components/Loader";
import { deleteCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  signOutUser: () => void;
  setLoading: (loading: boolean) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const signOutUser = async () => {
    await signOut(auth);
    setUser(null);
    deleteCookie("Bearer");
    deleteCookie("isLoggedIn");
    router.push("/sign-in");
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (firebaseUser: FirebaseUser | null) => {
        console.log("firebaseUser: ", firebaseUser);
        if (firebaseUser) {
          const { uid, email, displayName, photoURL } = firebaseUser;
          setUser({ uid, email, displayName, photoURL });
        } else {
          setUser(null);
        }
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    );

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <Loader />; // Yükleme sırasında Loading bileşenini göster
  }

  return (
    <UserContext.Provider value={{ user, setUser, signOutUser, setLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
