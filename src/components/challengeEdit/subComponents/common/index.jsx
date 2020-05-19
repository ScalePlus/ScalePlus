import React from "react";
import { PrimaryButton } from "../../../common";
import { InformationBlock } from "./style";

export function InfoBlock({ infoText, buttonText }) {
  return (
    <InformationBlock>
      <div className={"title"}>
        <span>{infoText}</span>
      </div>
      <div>
        <PrimaryButton
          variant="light"
          text={buttonText}
          onClick={() => {}}
        ></PrimaryButton>
      </div>
    </InformationBlock>
  );
}
