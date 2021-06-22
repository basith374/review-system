import { useEffect, useReducer, useState } from "react";
import firebase from "firebase/app";

export function useAuth() {
  const [auth, setAuth] = useState({
    busy: true,
    auth: null,
  });
  function authSuccess(auth) {
    setAuth({ busy: false, auth });
  }
  function logout() {
    setAuth({ busy: false, auth: null });
  }
  useEffect(() => {
    firebase.auth().onAuthStateChanged((rsp) => {
      if (rsp) {
        firebase
          .firestore()
          .collection("users")
          .where("email", "==", rsp.email)
          .get()
          .then((rsp) => {
            if (rsp.size) {
              authSuccess(rsp.docs[0].data());
            }
          });
      } else logout();
    });
  }, []);
  return {
    auth,
    authSuccess,
  };
}

export function useReviews({ auth }) {
  const initialState = {
    busy: true,
    reviews: [],
  };
  function reducer(state, action) {
    if (action.type === "CLEAR_REVIEWS") {
      return {
        ...state,
        reviews: [],
      };
    }
    if (action.type === "SET_REVIEWS") {
      return {
        ...state,
        reviews: action.data,
        busy: false,
      };
    }
    if (action.type === "ADD_REVIEW") {
      return {
        ...state,
        reviews: state.reviews.concat(action.data),
      };
    }
    return state;
  }
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    dispatch({ type: "CLEAR_REVIEWS" });
    let reviews = firebase.firestore().collection("reviews");
    if (auth.role === "employee") {
      reviews = reviews.where("reviewee", "==", auth.email);
    }
    reviews.get().then((rsp) => {
      const data = [];
      rsp.forEach((r) => {
        data.push(r.data());
      });
      dispatch({ type: "SET_REVIEWS", data });
    });
  }, [auth]);
  function addReview(content, reviewee, date) {
    const data = {
      content,
      reviewee,
      date,
      reviewer: firebase.auth().currentUser.email,
    };
    return firebase
      .firestore()
      .collection("reviews")
      .add(data)
      .then(() => {
        dispatch({ type: "ADD_REVIEW", data });
      });
  }
  return {
    busy: state.busy,
    reviews: state.reviews,
    addReview,
  };
}

export function useUsers() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .get()
      .then((rsp) => {
        const data = [];
        rsp.forEach((r) => {
          data.push({
            ...r.data(),
            id: r.id,
          });
        });
        setUsers(data);
      });
  }, []);
  return {
    users,
  };
}
