import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLinkedinDataAction } from "./action";
import QueryString from "query-string";
import { Loading } from "../common";

const Linkedinpopup = () => {
  const dispatch = useDispatch();
  const getLinkedinDataMethod = useCallback(
    (data) => dispatch(getLinkedinDataAction(data)),
    [dispatch]
  );

  const linkedinDataReducer = useSelector((state) => {
    return state.linkedinDataReducer;
  });

  useEffect(() => {
    const { error, success } = linkedinDataReducer;
    if (error) {
      window.opener &&
        window.opener.postMessage(
          {
            errorMessage: error,
            from: "Linked In",
          },
          window.location.origin
        );
    }

    if (success) {
      window.opener &&
        window.opener.postMessage(
          {
            success,
            from: "Linked In",
          },
          window.location.origin
        );
    }
  }, [linkedinDataReducer]);

  useEffect(() => {
    const params = QueryString.parse(window.location.search);
    if (params.error) {
      const errorMessage =
        params.error_description || "Login failed. Please try again.";
      window.opener &&
        window.opener.postMessage(
          {
            error: params.error,
            state: params.state,
            errorMessage,
            from: "Linked In",
          },
          window.location.origin
        );
      // Close tab if user cancelled login
      if (params.error === "user_cancelled_login") {
        window.close();
      }
    }
    if (params.code) {
      getLinkedinDataMethod({
        code: params.code,
      });
    }
  }, [getLinkedinDataMethod]);

  return <Loading />;
};

export default Linkedinpopup;
