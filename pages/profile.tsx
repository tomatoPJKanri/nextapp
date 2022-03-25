import Profile from "../src/components/Profile";
import { UserProps } from "../src/Types/UserInterface";

export default function profile({ user, refreshUser }: UserProps) {
  return (
    <div>{user && <Profile user={user} refreshUser={refreshUser!} />}</div>
  );
}
