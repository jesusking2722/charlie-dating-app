import { createContext, useContext, useState } from "react";
import { User } from "@/types";

interface UserContextProps {
  user: User | undefined;
  updateUser: (newUser: User | undefined) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const useUser = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be within UserProvider");
  }
  return context;
};

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | undefined>(undefined);
  const updateUser = (newUser: User | undefined) => {
    setUser(newUser);
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}
