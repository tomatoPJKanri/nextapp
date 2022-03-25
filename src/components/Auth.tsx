import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { authService } from "../firebase";
import {
  Button,
  Checkbox,
  Divider,
  Form,
  Grid,
  Segment,
} from "semantic-ui-react";

type Form = {
  email: string;
  password: string;
};

function Auth() {
  const [form, setForm] = useState<Form>({ email: "", password: "" });
  const [isNew, setIsNew] = useState<boolean>(true);

  const { email, password } = form;

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { name, value },
    } = e;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (isNew) {
        await createUserWithEmailAndPassword(authService, email, password);
      } else {
        await signInWithEmailAndPassword(authService, email, password);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = async (e: React.FormEvent<HTMLButtonElement>) => {
    const { name } = e.currentTarget;
    let provider = new GoogleAuthProvider();
    if (name === "github") {
      provider = new GithubAuthProvider();
    }

    await signInWithPopup(authService, provider);
  };

  return (
    <div className="loginform">
      <Segment placeholder>
        <Grid columns={2} relaxed="very" stackable>
          <Grid.Column>
            <Form onSubmit={handleSubmit}>
              <Form.Input
                name="email"
                icon="user"
                iconPosition="left"
                label="E-mail"
                placeholder="E-mail"
                onChange={handleChange}
                content={email}
              />
              <Form.Input
                name="password"
                icon="lock"
                iconPosition="left"
                label="Password"
                type="password"
                placeholder="password"
                onChange={handleChange}
                content={password}
              />

              <Button content={isNew ? "Create Account" : "Sign-In"} primary />
              <span onClick={() => setIsNew((prev) => !prev)}>
                {isNew ? "이미 계정을 가지고 있나요?" : "아직 계정이 없습니까?"}
              </span>
            </Form>
          </Grid.Column>

          <Grid.Column verticalAlign="middle">
            <div className="social">
              <Button onClick={handleClick} name="google" className="google">
                google
              </Button>
              <Button onClick={handleClick} name="github" className="github">
                github
              </Button>
            </div>
          </Grid.Column>
        </Grid>

        <Divider vertical>Or</Divider>
      </Segment>
      <style jsx>{`
        .loginform {
          width: 800px;
        }
        .social {
          display: flex;
        }
      `}</style>
    </div>
  );
}

export default Auth;
