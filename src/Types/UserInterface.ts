import { User } from "firebase/auth";

export type UserProps = {
    user: User;
    refreshUser?: () => void;
};