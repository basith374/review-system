import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  ${({ fullHeight }) => fullHeight && "height: 100vh;"}
`;
const Spinner = styled.div`
  width: ${({ small }) => (small ? "20px" : "50px")};
  height: ${({ small }) => (small ? "20px" : "50px")};
  border-radius: 50%;
  border-width: 2px;
  border-style: solid;
  border-color: ${({ light }) => (light ? "#fff" : "#555")} transparent
    ${({ light }) => (light ? "#fff" : "#555")} transparent;
  animation: foo 0.7s linear infinite;
  margin: 0 auto;
  @keyframes foo {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
export default function Loading({ small, light, fullHeight }) {
  return (
    <Container fullHeight={fullHeight}>
      <Spinner small={small} light={light} />
    </Container>
  );
}
