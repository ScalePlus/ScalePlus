import React, { useState, useEffect, useCallback } from "react";
import { getAttachedUsersAction } from "../../allUsers/action";
import { useDispatch, useSelector } from "react-redux";
import { MainContainer } from "./style";
import CanvasJSReact from "../../../lib/canvasjs.react";
import { Constants } from "../../../lib/constant";
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const PieChart = ({ t }) => {
  const dispatch = useDispatch();
  const getAttachedUsers = useCallback(
    (filters, searchText) =>
      dispatch(getAttachedUsersAction(filters, searchText)),
    [dispatch]
  );

  const attachedUsersReducer = useSelector((state) => {
    return state.attachedUsersReducer;
  });
  const allChallengesReducer = useSelector((state) => {
    return state.allChallengesReducer;
  });

  const is_admin =
    localStorage.getItem("userRole") === Constants.ROLES.ADMIN &&
    localStorage.getItem("token");

  useEffect(() => {
    getAttachedUsers({}, "");
  }, [getAttachedUsers]);

  const [dataPoints, setDataPoints] = useState([]);

  useEffect(() => {
    const { attachedUsers } = attachedUsersReducer;
    const { allChallenges } = allChallengesReducer;

    if (attachedUsers && attachedUsers.result) {
      if (attachedUsers.result.length) {
        let result = Object.assign([], attachedUsers.result);

        if (
          allChallenges &&
          allChallenges.result &&
          allChallenges.result.data &&
          is_admin
        ) {
          result = result.filter((each) => {
            if (each.challengeId && each.challengeId._id) {
              const index = allChallenges.result.data.findIndex(
                (data) =>
                  data._id.toString() === each.challengeId._id.toString()
              );
              if (index >= 0) {
                return each;
              } else {
                return null;
              }
            } else {
              return each;
            }
          });
        }

        const judges = result.filter(
          (each, index, self) =>
            self.findIndex(
              (record) =>
                record.data.userId._id === each.data.userId._id &&
                record.data.userId.roles.find(
                  (role) => role === Constants.ROLES.MENTOR_JUDGE
                )
            ) === index
        );
        const individuals = result.filter(
          (each, index, self) =>
            self.findIndex(
              (record) =>
                record.data.userId._id === each.data.userId._id &&
                record.data.userId.roles.find(
                  (role) => role === Constants.ROLES.STARTUP_INDIVIDUAL
                ) &&
                record.data.userId.details.isIndividual
            ) === index
        );
        const startUps = result.filter(
          (each, index, self) =>
            self.findIndex(
              (record) =>
                record.data.userId._id === each.data.userId._id &&
                record.data.userId.roles.find(
                  (role) => role === Constants.ROLES.STARTUP_INDIVIDUAL
                ) &&
                record.data.userId.details.isStartUp
            ) === index
        );
        const organisations = result.filter(
          (each, index, self) =>
            self.findIndex(
              (record) =>
                record.data.userId._id === each.data.userId._id &&
                record.data.userId.roles.find(
                  (role) => role === Constants.ROLES.ORGANIZATION
                )
            ) === index
        );

        let data = [];

        if (judges && judges.length) {
          data.push({ y: judges.length, label: "Judge" });
        }

        if (individuals && individuals.length) {
          data.push({ y: individuals.length, label: "Individual" });
        }

        if (startUps && startUps.length) {
          data.push({ y: startUps.length, label: "Startup" });
        }

        if (is_admin) {
          data.push({ y: organisations.length, label: "Organisation" });
        }

        setDataPoints(data);
      } else {
        setDataPoints([]);
      }
    }
  }, [attachedUsersReducer, allChallengesReducer, is_admin]);

  return (
    <MainContainer>
      <div className="title-container">{t("Users Analysis")}</div>
      <div dir="ltr">
        <CanvasJSChart
          options={{
            animationEnabled: true,
            data: [
              {
                type: "pie",
                indexLabel: "{label} {y}",
                dataPoints,
              },
            ],
          }}
        />
      </div>
    </MainContainer>
  );
};

export default PieChart;
