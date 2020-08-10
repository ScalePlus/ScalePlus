import React from "react";
import { ValidationBlockContainer } from "./style";

const ValidationBlock = ({ t, descError, catError, imgError }) => {
  return (
    <ValidationBlockContainer>
      <div className="complete-task-dialogue">
        <div className="step">
          <div className="icon-container">
            <img
              src="/images/back.png"
              alt=""
              height="10px"
              width="15px"
              style={{ transform: "scaleX(-1)" }}
            />
          </div>
          <div>
            <div className="title">{t("VALIDATION_BLOCK_TITLE")}</div>
          </div>
        </div>
        <div className="step">
          <div className="icon-container">
            <img
              src={
                descError
                  ? "/images/check-circle.png"
                  : "/images/check-circle-active.png"
              }
              alt=""
              height="15px"
              width="15px"
            />
          </div>
          <div>
            <div className="title">{t("Short Description")}</div>
            <div className="description">
              {t("VALIDATION_BLOCK_SHORT_DESC")}
            </div>
          </div>
        </div>
        <div className="step">
          <div className="icon-container">
            <img
              src={
                catError
                  ? "/images/check-circle.png"
                  : "/images/check-circle-active.png"
              }
              alt=""
              height="15px"
              width="15px"
            />
          </div>
          <div>
            <div className="title">{t("Categories")}</div>
            <div className="description">
              {t("VALIDATION_BLOCK_CATEGORIES_DESC")}
            </div>
          </div>
        </div>
        <div className="step">
          <div className="icon-container">
            <img
              src={
                imgError
                  ? "/images/check-circle.png"
                  : "/images/check-circle-active.png"
              }
              alt=""
              height="15px"
              width="15px"
            />
          </div>
          <div>
            <div className="title">{t("Add Image")}</div>
            <div className="description">{t("Add_Image_DESC")}</div>
          </div>
        </div>
      </div>
    </ValidationBlockContainer>
  );
};

export default ValidationBlock;
