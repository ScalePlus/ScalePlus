import React from "react";
import { PrimaryButton } from "../../../common";
import { InformationBlock } from "./style";

export function InfoBlock({ children, buttonText }) {
  return (
    <InformationBlock>
      <div className={"title"}>{children}</div>
      {buttonText && (
        <div>
          <PrimaryButton
            variant="light"
            text={buttonText}
            onClick={() => {}}
          ></PrimaryButton>
        </div>
      )}
    </InformationBlock>
  );
}
