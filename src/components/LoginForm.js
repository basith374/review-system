import { useRef, useState } from "react";
import styled from "styled-components";
import firebase from "firebase/app";
import Loading from "./Loading";

const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const Input = styled.input`
  padding: 0 20px;
  line-height: 40px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 100%;
`;

const Button = styled.button`
  line-height: 40px;
  background: #3498db;
  color: #fff;
  width: 100%;
  border: none;
  border-radius: 8px;
  font-weight: 600;
`;

const Label = styled.label`
  color: #777;
  display: inline-block;
  margin-bottom: 5px;
`;

const Title = styled.div`
  font-size: 40px;
  text-align: center;
  margin-bottom: 20px;
  color: ${({ light }) => (light ? "#fff" : "#555")};
`;

const Left = styled.div`
  background: #3498db;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function LoginForm() {
  const [busy, setBusy] = useState(false);
  const email = useRef();
  const password = useRef();
  function submit() {
    setBusy(true);
    firebase
      .auth()
      .signInWithEmailAndPassword(email.current.value, password.current.value)
  }
  function onKeyDown(e) {
    if (e.keyCode === 13) submit();
  }
  return (
    <Container>
      <Left>
        <Title light>Welcome 👋</Title>
      </Left>
      <Right>
        <div>
          <Title>Sign in</Title>
          <div>
            <Label>Email</Label>
            <Input type="email" ref={email} onKeyDown={onKeyDown} />
          </div>
          <div>
            <Label>Password</Label>
            <Input type="password" ref={password} onKeyDown={onKeyDown} />
          </div>
          <div>
            <Button onClick={submit}>
              {busy ? <Loading small light /> : "Login"}
            </Button>
          </div>
        </div>
      </Right>
    </Container>
  );
}
