import { createContext, useContext } from "react";
import "./App.css";
import LoginForm from "./components/LoginForm";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SubmitReview from "./components/SubmitReview";
import Reviews from "./components/Reviews";
import Loading from "./components/Loading";
import { useAuth, useReviews } from "./lib/hooks";

export const ReviewContext = createContext();
export const AuthContext = createContext();

function Container() {
  const auth = useContext(AuthContext);
  const reviews = useReviews(auth);
  return (
    <ReviewContext.Provider value={reviews}>
      <Router>
        <Switch>
          <Route path="/submit-review">
            <SubmitReview />
          </Route>
          <Route path="/">
            <Reviews />
          </Route>
        </Switch>
      </Router>
    </ReviewContext.Provider>
  );
}

function Content() {
  const { auth, authSuccess } = useAuth();
  if (auth.busy) return <Loading fullHeight />;
  if (!auth.auth) return <LoginForm authSuccess={authSuccess} />;
  return (
    <AuthContext.Provider value={auth}>
      <Container />
    </AuthContext.Provider>
  );
}

function App() {
  return (
    <div className="App">
      <Content />
    </div>
  );
}

export default App;
