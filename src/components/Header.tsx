import { useUser } from "@/context/UserContext";
import { usePathname } from "next/navigation";

const Header = () => {
  const { user, signOutUser } = useUser();
  const pathname = usePathname();

  return (
    <>
      {pathname !== "/sign-in" && (
        <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
          <div>
            {user ? (
              <span>Welcome, {user.displayName || "User"}!</span>
            ) : (
              <span>Please sign in</span>
            )}
          </div>
          <div>
            {user && (
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={signOutUser}
              >
                Logout
              </button>
            )}
          </div>
        </header>
      )}
    </>
  );
};

export default Header;
