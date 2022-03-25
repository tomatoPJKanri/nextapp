import React, { useEffect, useState } from "react";
import {
  Button,
  Dimmer,
  Form,
  Icon,
  Image,
  Segment,
  TextArea,
} from "semantic-ui-react";
import { dbService, storageService } from "../firebase";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import SparrowList from "./SparrowList";
import { UserProps } from "../Types/UserInterface";
import { DocDatas } from "../Types/DocumentInteface";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { v4 as uuid } from "uuid";

export default function Main({ user }: UserProps) {
  const [sparrow, setSparrow] = useState<string>("");
  const [sparrows, setSparrows] = useState<DocDatas["sparrow"][]>();
  const [file, setFile] = useState<string>("");
  const [active, setActive] = useState<boolean>(false);

  const content = (
    <div>
      <Icon
        name="remove circle"
        size="huge"
        color="grey"
        onClick={() => setFile("")}
      />
    </div>
  );

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSparrow(e.currentTarget.value);
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.currentTarget;
    if (!files) return;

    const image = files[0];
    const loadedFile = new FileReader();
    loadedFile.onloadend = (f: any): any => {
      setFile(f.currentTarget.result);
    };
    loadedFile.readAsDataURL(image);
    setActive(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fileRef = ref(storageService, `${user.uid}/${uuid()}`);

    try {
      let url: string = "";

      if (file !== "") {
        const result = await uploadString(fileRef, file, "data_url");
        url = await getDownloadURL(result.ref);
      }

      const body = {
        text: sparrow,
        username: user.displayName,
        createAt: Date.now(),
        createBy: user.uid,
        url,
      };

      await addDoc(collection(dbService, "dove"), body);
      setSparrow("");
    } catch (e) {}
  };

  useEffect(() => {
    const q = query(collection(dbService, "dove"), orderBy("createAt", "desc"));

    onSnapshot(q, (snapshot) => {
      const fetchSparrow = snapshot.docs.map(
        (d) =>
          ({
            id: d.id,
            userPhoto: user.photoURL,
            ...d.data(),
          } as DocDatas["sparrow"])
      );

      setSparrows(fetchSparrow);
    });
  }, []);

  return (
    <>
      <Segment style={{ padding: "1em 1em" }} vertical>
        <h3>{user && (user.displayName || "Unknown User")}님, 환영합니다.</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <TextArea
              placeholder="지금 무슨 생각하나요?"
              onChange={handleChange}
              value={sparrow}
              rows={3}
            />
          </Form.Field>
          <Form.Field>
            {file ? (
              <Dimmer.Dimmable
                as={Image}
                dimmed={active}
                dimmer={{ active, content }}
                onMouseEnter={() => setActive(true)}
                onMouseLeave={() => setActive(false)}
                size="medium"
                src={file}
              />
            ) : (
              <label>
                <input type="file" accept="image/*" onChange={handleFile} />
                <Icon name="photo" size="big" />
              </label>
            )}
          </Form.Field>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button primary={sparrow.length > 0} disabled={sparrow.length <= 0}>
              Sparrow!!
            </Button>
          </div>
        </Form>

        <div> {sparrows && <SparrowList sparrows={sparrows} />}</div>
      </Segment>
      <style jsx>{`
        div {
          margin-top: 4rem;
        }
        input {
          display: none;
        }
        label {
          width: 50px;
          padding: 10px 10px;
          background-color: #ffffff;
          cursor: pointer;
        }
      `}</style>
    </>
  );
}
