import React from "react";
import { MainContainer } from "./style";
import CanvasJSReact from "../../../lib/canvasjs.react";
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const PieChart = ({ t }) => {
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
                startAngle: 240,
                indexLabel: "{label} {y}",
                dataPoints: [
                  { y: 59.0, label: "Startups" },
                  { y: 17.0, label: "Individuals" },
                  { y: 37.0, label: "Judges" },
                ],
              },
            ],
          }}
        />
      </div>
    </MainContainer>
  );
};

export default PieChart;
