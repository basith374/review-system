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
  cursor: pointer;
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

const Error = styled.div`
  color: #c0392b;
  margin-top: 20px;
  text-align: center;
`;

export default function LoginForm() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState();
  const email = useRef();
  const password = useRef();
  function submit() {
    const _email = email.current.value;
    const _password = password.current.value;
    if (_email && _password) {
      setBusy(true);
      firebase
        .auth()
        .signInWithEmailAndPassword(_email, _password)
        .catch((err) => {
          setBusy(false);
          if (err.code === "auth/wrong-password" || err.code === "auth/user-not-found") {
            setError("Invalid login");
          }
        });
    }
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
          {error && <Error>{error}</Error>}
        </div>
      </Right>
    </Container>
  );
}
