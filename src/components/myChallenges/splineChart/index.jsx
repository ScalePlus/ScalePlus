import React from "react";
import { MainContainer } from "./style";
import CanvasJSReact from "../../../lib/canvasjs.react";
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const SplineChart = ({ t }) => {
  return (
    <MainContainer>
      <div className="title-container">{t("Challenges Analysis")}</div>
      <div dir="ltr">
        <CanvasJSChart
          options={{
            theme: "light2",
            animationEnabled: true,
            axisY: {
              includeZero: false,
              title: "Number of Users",
            },
            toolTip: {
              shared: "true",
            },
            legend: {
              cursor: "pointer",
            },
            data: [
              {
                type: "spline",
                visible: false,
                showInLegend: true,
                name: "Challenge 1",
                dataPoints: [
                  { label: "Start", y: 2 },
                  { label: "Submission", y: 2 },
                  { label: "Qualification", y: 2 },
                  { label: "Judging", y: 2 },
                  { label: "Winners", y: 3 },
                ],
              },
              {
                type: "spline",
                showInLegend: true,
                visible: false,
                name: "Challenge 2",
                dataPoints: [
                  { label: "Start", y: 3 },
                  { label: "Submission", y: 3 },
                  { label: "Qualification", y: 3 },
                  { label: "Judging", y: 3 },
                  { label: "Winners", y: 4 },
                ],
              },
              {
                type: "spline",
                visible: false,
                showInLegend: true,
                name: "Challenge 3",
                dataPoints: [
                  { label: "Start", y: 4 },
                  { label: "Submission", y: 4 },
                  { label: "Qualification", y: 4 },
                  { label: "Judging", y: 4 },
                  { label: "Winners", y: 5 },
                ],
              },
              {
                type: "spline",
                showInLegend: true,
                name: "Challenge 4",
                dataPoints: [
                  { label: "Start", y: 5 },
                  { label: "Submission", y: 5 },
                  { label: "Qualification", y: 5 },
                  { label: "Judging", y: 5 },
                  { label: "Winners", y: 6 },
                ],
              },
              {
                type: "spline",
                showInLegend: true,
                name: "Challenge 5",
                dataPoints: [
                  { label: "Start", y: 6 },
                  { label: "Submission", y: 6 },
                  { label: "Qualification", y: 6 },
                  { label: "Judging", y: 6 },
                  { label: "Winners", y: 7 },
                ],
              },
              {
                type: "spline",
                showInLegend: true,
                name: "Challenge 6",
                dataPoints: [
                  { label: "Start", y: 7 },
                  { label: "Submission", y: 7 },
                  { label: "Qualification", y: 7 },
                  { label: "Judging", y: 7 },
                  { label: "Winners", y: 8 },
                ],
              },
              {
                type: "spline",
                showInLegend: true,
                name: "Challenge 7",
                dataPoints: [
                  { label: "Start", y: 8 },
                  { label: "Submission", y: 8 },
                  { label: "Qualification", y: 8 },
                  { label: "Judging", y: 8 },
                  { label: "Winners", y: 9 },
                ],
              },
            ],
          }}
        />
      </div>
    </MainContainer>
  );
};

export default SplineChart;
