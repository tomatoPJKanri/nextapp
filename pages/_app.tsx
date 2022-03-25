import {
  NextOrObserver,
  onAuthStateChanged,
  updateProfile,
  User,
} from "firebase/auth";
import { AppProps } from "next/app";
import { SetStateAction, useEffect, useState } from "react";
import "semantic-ui-css/semantic.min.css";
import { Loader } from "semantic-ui-react";
import Gnb from "../src/components/Gnb";
import { authService } from "../src/firebase";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<User | null>();
  const [init, setInit] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const refreshUser = async () => {
    setUser(Object.assign({} as any, { ...authService.currentUser }));
    setUser(authService.currentUser);
  };

  useEffect(() => {
    onAuthStateChanged(authService, async (u: any) => {
      if (u) {
        setIsLoggedIn(true);
        setUser(u);
        // setUser({
        //   displayName: u.displayName,
        //   uid: u.uid,
        //   photoURL: u.photoURL,
        //   updateProfile: (args) => u.updateProfile(args),
        // });
        if (!u.displayName) {
          await updateProfile(u, { displayName: "Unknown User" });
        }
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      <Gnb user={user!} />
      {init ? (
        <Component
          {...pageProps}
          user={user}
          isLoggedIn={isLoggedIn}
          refreshUser={refreshUser}
        />
      ) : (
        <div
          style={{ minHeight: "800px", display: "flex", alignItems: "center" }}
        >
          <Loader active inline="centered" size="massive">
            Initializing...
          </Loader>
        </div>
      )}
    </>
  );
}
