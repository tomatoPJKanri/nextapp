import { updateProfile } from "firebase/auth";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { dbService } from "../firebase";
import { DocDatas } from "../Types/DocumentInteface";
import { UserProps } from "../Types/UserInterface";
import SparrowList from "./SparrowList";

export default function Profile({ user, refreshUser }: UserProps) {
  const [modifiedName, setModifiedName] = useState<string | null>(
    user.displayName
  );
  const [ownSparrows, setOwnSparrows] = useState<DocDatas["sparrow"][]>();

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setModifiedName(e.currentTarget.value);
  };

  const handleModify = async () => {
    try {
      await updateProfile(user, { displayName: modifiedName });
      refreshUser?.();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const q = query(
      collection(dbService, "dove"),
      where("createBy", "==", user.uid),
      orderBy("createAt", "desc")
    );

    onSnapshot(q, (snapshot) => {
      const fetchSparrow = snapshot.docs.map(
        (d) =>
          ({
            id: d.id,
            ...d.data(),
          } as DocDatas["sparrow"])
      );

      setOwnSparrows(fetchSparrow);
    });
  }, []);

  return (
    <div>
      <input value={modifiedName!} onChange={handleChange} />
      <button onClick={handleModify}>수정</button>
      <div> {ownSparrows && <SparrowList sparrows={ownSparrows} />}</div>
    </div>
  );
}
