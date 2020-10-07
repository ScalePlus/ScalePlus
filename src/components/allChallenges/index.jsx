import React from "react";
import ChallengesList from "./subComponents/challengesList";
import SubscribeHeader from "./subComponents/subscribeHeader";

const AllChallenges = ({ history }) => {
  return (
    <div>
      <SubscribeHeader />
      <ChallengesList history={history} />
    </div>
  );
};

export default AllChallenges;
