import moment from "moment";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext, ReviewContext } from "../App";
import Loading from "./Loading";
import firebase from "firebase/app";

function LoadingRow() {
  return (
    <tr>
      <td colSpan="4" style={{ padding: "50px" }}>
        <Loading />
      </td>
    </tr>
  );
}

function Content({ busy, reviews }) {
  if (busy) return <LoadingRow />;
  if (reviews.length === 0)
    return (
      <tr>
        <td colSpan="4" align="center">
          No data
        </td>
      </tr>
    );
  return reviews.map((r, i) => (
    <tr key={i}>
      <td>{r.content}</td>
      <td>{r.reviewee}</td>
      <td>{r.reviewer}</td>
      <td>{moment(r.date).format("DD/MM/YYYY HH:mm")}</td>
    </tr>
  ));
}

export default function Reviews() {
  const { auth } = useContext(AuthContext);
  const { reviews, busy } = useContext(ReviewContext);
  const history = useHistory();
  function newReview() {
    history.push("/submit-review");
  }
  function logout() {
    firebase.auth().signOut();
  }
  return (
    <div className="Reviews">
      <div className="Toolbar">
        <div className="ld">
          Welcome, {auth.name} <span>({auth.role})</span>
        </div>
        <button className="btn" onClick={newReview}>New review</button>
        <button className="pad" onClick={logout}>
          <svg viewBox="0 0 24 24" height="20">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              stroke="#555"
              fill="none"
            />
          </svg>
        </button>
      </div>
      <div className="Table">
        <table>
          <thead>
            <tr>
              <th>Review</th>
              <th>About</th>
              <th>Reviewed by</th>
              <th>When</th>
            </tr>
          </thead>
          <tbody>
            <Content {...{ reviews, busy }} />
          </tbody>
        </table>
      </div>
    </div>
  );
}
