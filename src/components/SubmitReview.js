import { useContext, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext, ReviewContext } from "../App";
import { useUsers } from "../lib/hooks";
import Loading from "./Loading";

export default function SubmitReview() {
  const [busy, setBusy] = useState(false);
  const { users } = useUsers();
  const { addReview } = useContext(ReviewContext);
  const { auth } = useContext(AuthContext);
  const history = useHistory();
  const user = useRef();
  const review = useRef();
  function submit() {
    setBusy(true);
    addReview(
      review.current.value,
      user.current.value,
      new Date().valueOf()
    ).then(() => {
      history.push("/");
    });
  }
  return (
    <div className="SubmitReview">
      <div>
        <div className="Toolbar left">
          <button className="pad" onClick={() => history.push("/")}>
            <svg viewBox="0 0 20 20" height="20">
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div className="title">Write review</div>
        <div>
          <label>About</label>
          <select ref={user} defaultValue="">
            <option value="" disabled>
              Select user
            </option>
            {users.filter(u => u.email !== auth.email).map((u) => (
              <option key={u.id} value={u.email}>
                {u.email}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Your review</label>
          <textarea placeholder="Review" ref={review} />
        </div>
        <div className="submit">
          <button onClick={submit}>
            {busy ? <Loading small light /> : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}
