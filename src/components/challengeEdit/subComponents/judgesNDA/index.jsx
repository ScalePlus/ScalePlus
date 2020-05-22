import React, { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { CheckBox, EditorInput } from "../../../common";
import { HeaderComponent } from "../../../challengePreview/subComponents/common";
import { MainContainer } from "./style";
import { InfoBlock } from "../common";

const JudgesNDA = () => {
  const [validated, setValidated] = useState(false);
  const [check, setCheck] = useState(false);
  const [description, changeDescription] = useState(`
  <p>THIS AGREEMENT IS BETWEEN:</p>
  <br/>
<p>1. Name (&ldquo;the Challenge Sponsor&rdquo;) and its challenge competitors (collectively, &ldquo;the Challenge Participants&rdquo;); and</p>
<br/>
<p>2. You, the Challenge Judge (&ldquo;the Judge&rdquo;),</p>
<br/>
<p>collectively referred to as &ldquo;the Parties&rdquo;.</p>
<br/>
<p>RECITALS</p>
<br/>
<p>A. The Judge understands that the Challenge Participants have disclosed or may disclose information relating to source code, product designs, art, intellectual property, and other related concepts, which to the extent previously, presently, or subsequently disclosed to the Judge is hereinafter referred to as Proprietary Information of the Challenge Participants.</p>
<br/>
<p>OPERATIVE PROVISIONS</p>
<br/>
<p>1. In consideration of the disclosure of Proprietary Information by the Challenge Participants, the Judge hereby agrees: (i) to hold the Proprietary Information in strict confidence and to take all reasonable precautions to protect such Proprietary Information (including, without limitation, all precautions the Judge employs with respect to its own confidential materials), (ii) not to disclose any such Proprietary Information or any information derived therefrom to any third person, (iii) not to make any use whatsoever at any time of such Proprietary Information except to evaluate it in relation to the Challenge Sponsor&rsquo;s challenge, and (iv) not to copy or reverse engineer any such Proprietary Information. The Judge shall procure that its employees, agents and sub-contractors to whom Proprietary Information is disclosed or who have access to Proprietary Information sign a nondisclosure or similar agreement in content substantially similar to this Agreement.</p>
<br/>
<p>2. Without granting any right or license, the Challenge Sponsor agrees that the foregoing shall not apply with respect to any information after five years following the disclosure thereof or any information that the Judge can document (i) is or becomes (through no improper action or inaction by the Judge or any affiliate, agent, consultant or employee) generally available to the public, or (ii) was in its possession or known by it prior to receipt from the Challenge Participants as evidenced in writing, except to the extent that such information was unlawfully appropriated, or (iii) was rightfully disclosed to it by a third party, or (iv) was independently developed without use of any Proprietary Information of the Challenge Participants. The Judge may make disclosures required by law or court order provided the Judge uses diligent reasonable efforts to limit disclosure and has allowed the Challenge Participants to seek a protective order.</p>
<br/>
<p>3. When applicable: Immediately upon the written request by the Challenge Participants at any time, the Judge will return to the Challenge Participants all Proprietary Information and all documents or media containing any such Proprietary Information and any and all copies or extracts thereof, save that where such Proprietary Information is a form incapable of return or has been copied or transcribed into another document, it shall be destroyed or erased, as appropriate.</p>
<br/>
<p>4. The Judge understands that nothing herein (i) requires the disclosure of any Proprietary Information or (ii) requires the Challenge Participants to proceed with any transaction or relationship.</p>
<br/>
<p>5. The Judge further acknowledges and agrees that no representation or warranty, express or implied, is or will be made, and no responsibility or liability is or will be accepted by the Challenge Sponsor, or by any of its respective directors, officers, employees, agents or advisers, as to, or in relation to, the accuracy of completeness of any Proprietary Information made available to the Judge or its advisers; it is responsible for making its own evaluation of such Proprietary Information.</p>
<br/>
<p>6. The failure of either party to enforce its rights under this Agreement at any time for any period shall not be construed as a waiver of such rights. If any part, term or provision of this Agreement is held to be illegal or unenforceable neither the validity, nor enforceability of the remainder of this Agreement shall be affected. Neither Party shall assign or transfer all or any part of its rights under this Agreement without the consent of the other Party. This Agreement may not be amended for any other reason without the prior written agreement of both Parties. This Agreement constitutes the entire understanding between the Parties relating to the subject matter hereof unless any representation or warranty made about this Agreement was made fraudulently and, save as may be expressly referred to or referenced herein, supersedes all prior representations, writings, negotiations or understandings with respect hereto.</p>
<br/>
<p>7. This Agreement shall be governed by the laws of the jurisdiction in which the Challenge Sponsor is located (or if the Challenge Sponsor is based in more than one country, the country in which its headquarters are located) (&ldquo;the Territory&rdquo;) and the Parties agree to submit disputes arising out of or in connection with this Agreement to the non-exclusive of the courts in the Territory.</p>`);
  return (
    <MainContainer>
      <Row style={{ marginBottom: 30 }}>
        <Col>
          <InfoBlock>
            <span>
              Review and customize the Non-Disclosure Agreement (NDA) for your
              judges here. All judges must agree to the NDA before they can be
              confirmed.
            </span>
          </InfoBlock>
        </Col>
      </Row>
      <Form
        noValidate
        validated={validated}
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          const form = event.currentTarget;
          if (form.checkValidity()) {
            alert();
          }
          setValidated(true);
        }}
      >
        <Row style={{ marginBottom: 45 }}>
          <Col>
            <HeaderComponent
              titleText="Judges NDA"
              buttonText="Save"
              buttonVariant="success"
              buttonType="submit"
            />
          </Col>
        </Row>
        <Row style={{ marginBottom: 25 }}>
          <Col>
            <CheckBox
              checkBoxText="Enable Judges NDA"
              checked={check}
              onChange={() => {
                setCheck(!check);
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <EditorInput
              value={description}
              onChange={(value) => {
                changeDescription(value);
              }}
              description="The judges NDA agreement that applies to this challenge."
            />
          </Col>
        </Row>
      </Form>
    </MainContainer>
  );
};

export default JudgesNDA;
