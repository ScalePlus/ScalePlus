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

  useEffect(() => {
    getAttachedUsers({}, "");
  }, [getAttachedUsers]);

  const [dataPoints, setDataPoints] = useState([]);

  useEffect(() => {
    const { attachedUsers } = attachedUsersReducer;
    if (attachedUsers && attachedUsers.result) {
      if (attachedUsers.result.length) {
        const { result } = attachedUsers;
        const judges = result.filter(
          (each) =>
            each &&
            each.data &&
            each.data.userId &&
            each.data.userId.roles[0] === Constants.ROLES.MENTOR_JUDGE
        );
        const individuals = result.filter(
          (each) =>
            each &&
            each.data &&
            each.data.userId &&
            each.data.userId.roles[0] === Constants.ROLES.STARTUP_INDIVIDUAL &&
            each.data.userId.details.isIndividual
        );
        const startUps = result.filter(
          (each) =>
            each &&
            each.data &&
            each.data.userId &&
            each.data.userId.roles[0] === Constants.ROLES.STARTUP_INDIVIDUAL &&
            each.data.userId.details.isStartUp
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

        setDataPoints(data);
      } else {
        setDataPoints([]);
      }
    }
  }, [attachedUsersReducer]);

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
