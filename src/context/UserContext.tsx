import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import Loader from "@/components/Loader";
import { deleteCookie, setCookie } from "cookies-next";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/services/supabaseClientService";
import toast, { Toaster } from "react-hot-toast";

interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  [key: string]: any;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  signOutUser: () => void;
  setLoading: (loading: boolean) => void;
  addUserProperty?: (prop: any) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const pathname = usePathname();

  const signOutUser = async () => {
    supabase.auth.signOut();
    deleteCookie("Bearer");
    setUser(null);
    router.push("/sign-in");
  };

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("event: ", event);
        const user = session?.user;
        if (user) {
          setUser(user as any);
          setCookie("Bearer", session?.access_token, {
            expires: new Date((session?.expires_at as number) * 1000),
          });
          router.push("/");
          setLoading(false);
          event === "INITIAL_SESSION" && toast.success("Welcome back!");
        } else {
          router.push("/sign-in");
          setTimeout(() => {
            setUser(null);
            setLoading(false);
          }, 1000);
        }
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
      console.log("asd");
    };
  }, [router, setUser]);

  return (
    <UserContext.Provider value={{ user, setUser, signOutUser, setLoading }}>
      <div className={`${loading ? "visible" : "invisible"} absolute w-full`}>
        <Loader />
      </div>
      <div className={`${!loading ? "visible" : "invisible"}`}>{children}</div>
      <div>
        <Toaster />
      </div>
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
