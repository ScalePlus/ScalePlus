import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Input,
  DropDown,
  TextArea,
  PrimaryButton,
  BannerInput,
  PageTitle,
} from "../common";
import { Form, Row, Col } from "react-bootstrap";
import { Constants } from "../../lib/constant";

const Step2 = ({
  t,
  title,
  setTitle,
  prize,
  setPrize,
  categories,
  selectCategories,
  currency,
  selectCurrency,
  shortDescription,
  setSortDescription,
  bannerImage,
  setBannerImage,
  cropedBannerImage,
  setCropedBannerImage,
  videoURL,
  setVideoURL,
  currencyList,
  history,
}) => {
  const [validated, setValidated] = useState(false);
  const challengeReducer = useSelector((state) => {
    return state.challengeReducer;
  });

  return (
    <Row className="sub-container">
      <Col>
        <Row className="sub-title">
          <Col>{t("STEP2_title")}</Col>
        </Row>
        <Row className="title-container">
          <Col>
            <PageTitle text={t("STEP2_pagetitle")} />
          </Col>
        </Row>
        <Row className="sub-title">
          <Col>{t("STEP2_subtitle")}</Col>
        </Row>
        <Form
          noValidate
          validated={validated}
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            const form = event.currentTarget;
            if (
              form.checkValidity() &&
              (!videoURL || (videoURL && videoURL.match(Constants.isURL))) &&
              shortDescription &&
              shortDescription.length <= 140 &&
              categories &&
              categories.length
            ) {
              history.push("/create/challenge/3");
            }
            window.scrollTo(0, 0);
            setValidated(true);
          }}
        >
          <Row className="form-container">
            <Col>
              <Input
                type="text"
                label={t("Title") + " *"}
                required
                errorMessage={t("title_error")}
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              <DropDown
                isSmall={true}
                label={t("Categories") + " *"}
                placeholder=""
                description={t("Categories_description")}
                options={
                  challengeReducer.challengeCategories &&
                  challengeReducer.challengeCategories.length
                    ? challengeReducer.challengeCategories.map((option) => {
                        return { value: option._id, label: option.name };
                      })
                    : []
                }
                value={categories}
                onChange={(val) => {
                  selectCategories(val);
                }}
                isInvalid={
                  validated &&
                  (!categories || (categories && categories.length === 0))
                }
                errorMessage={t("Categories_error")}
              />
              {/* <div className="price-container">
                <DropDown
                  isSmall={true}
                  label={t("Currency") + " *"}
                  placeholder=""
                  // description={t("Categories_description")}
                  options={
                    currencyList && currencyList.length
                      ? currencyList.map((option) => {
                          return { value: option._id, label: option.country };
                        })
                      : []
                  }
                  value={currency}
                  onChange={(val) => {
                    selectCurrency(val);
                  }}
                  isInvalid={
                    validated &&
                    (!currency || (currency && currency.length === 0))
                  }
                  errorMessage={t("currency_error")}
                /> */}

              <Input
                type="number"
                label={t("Prize") + " *"}
                description={t("Prize_desscription")}
                required
                errorMessage={t("prize_error")}
                value={prize}
                onChange={(e) => {
                  setPrize(e.target.value);
                }}
              />
              {/* </div> */}
              <TextArea
                rows="3"
                label={t("Short Description") + " *"}
                description={t("Short_desscription")}
                showCount={140}
                value={shortDescription}
                onChange={(e) => {
                  setSortDescription(e.target.value);
                }}
                isInvalid={
                  validated &&
                  (!shortDescription ||
                    (shortDescription && shortDescription.length > 140))
                }
                errorMessage={
                  shortDescription
                    ? t("Short_desscription_invalid_error")
                    : t("Short_desscription_error")
                }
              />
              <BannerInput
                t={t}
                label={t("Challenge Banner Image")}
                description={t("Banner_Image_desscription")}
                value={bannerImage}
                cropedBannerImage={cropedBannerImage}
                onChange={(e) => {
                  setBannerImage(e.target.files[0]);
                }}
                onCropDone={(file) => {
                  setCropedBannerImage(file);
                }}
              />
              <Input
                type="text"
                label={t("Video URL")}
                description={t("video_url_description")}
                value={videoURL}
                onChange={(e) => {
                  setVideoURL(e.target.value);
                }}
                isInvalid={
                  validated && videoURL && !videoURL.match(Constants.isURL)
                }
                errorMessage={t("invalid_videoURL_error")}
              />
            </Col>
          </Row>
          <Row className="right-content-container">
            <Col>{t("You can always edit this information later")}</Col>
          </Row>
          <Row className="button-container">
            <Col className="center-component">
              <PrimaryButton
                variant="primary"
                text={t("Continue")}
                type="submit"
              ></PrimaryButton>
            </Col>
          </Row>
          <Row className="bottom-container">
            <Col>
              {t("Need_Help_Text")}{" "}
              <span className="contact-link">{t("Contact Us")}</span>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};

export default React.memo(Step2);
