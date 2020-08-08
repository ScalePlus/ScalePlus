import React, { useState, useCallback, useRef, useEffect } from "react";
import { Modal, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { PrimaryButton } from "../common";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { Constants } from "../../lib/constant";

// Setting a high pixel ratio avoids blurriness in the canvas crop preview.
const pixelRatio = 4;

// We resize the canvas down when saving on retina devices otherwise the image
// will be double or triple the preview size.
function getResizedCanvas(canvas, newWidth, newHeight) {
  const tmpCanvas = document.createElement("canvas");
  tmpCanvas.width = newWidth;
  tmpCanvas.height = newHeight;

  const ctx = tmpCanvas.getContext("2d");
  ctx.drawImage(
    canvas,
    0,
    0,
    canvas.width,
    canvas.height,
    0,
    0,
    newWidth,
    newHeight
  );

  return tmpCanvas;
}

function generateDownload(previewCanvas, crop, originalFile, onFileChange) {
  if (!crop || !previewCanvas) {
    return;
  }

  const canvas = getResizedCanvas(previewCanvas, crop.width, crop.height);

  canvas.toBlob(
    (blob) => {
      onFileChange(new File([blob], originalFile.name));
    },
    originalFile.type,
    1
  );
}

function convertImgToBase64(url, callback, outputFormat) {
  var canvas = document.createElement("CANVAS");
  var ctx = canvas.getContext("2d");
  var img = new Image();
  img.crossOrigin = "Anonymous";
  img.onload = function () {
    canvas.height = img.height;
    canvas.width = img.width;
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL(outputFormat || "image/png");
    callback.call(this, dataURL);
    // Clean up
    canvas = null;
  };
  img.src = url;
}

export default function CropImage({ show, setShow, file, onFileChange }) {
  const { t } = useTranslation();
  const [upImg, setUpImg] = useState();
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState({ unit: "%", width: 30, aspect: 16 / 9 });
  const [completedCrop, setCompletedCrop] = useState(null);

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  useEffect(() => {
    if (file) {
      if (file && file.name) {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          setUpImg(reader.result);
        });
        reader.readAsDataURL(file);
      } else if (file.match(Constants.isURL)) {
        convertImgToBase64(
          "https://cors-anywhere.herokuapp.com/" + file,
          (base64Img) => {
            setUpImg(base64Img);
          }
        );
      }
    }
  }, [file]);

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");

    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingEnabled = false;

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
  }, [completedCrop]);

  return (
    <Modal show={show} onHide={() => setShow(false)} centered>
      <Modal.Body>
        <Row className="justify-content-center">
          <Col>
            <div style={{ textAlign: "center", margin: "1rem 0rem" }}>
              <ReactCrop
                src={upImg}
                onImageLoaded={onLoad}
                crop={crop}
                onChange={(c) => setCrop(c)}
                onComplete={(c) => setCompletedCrop(c)}
              />
            </div>
            <div style={{ textAlign: "center", margin: "1rem 0rem" }}>
              <canvas
                ref={previewCanvasRef}
                style={{
                  width: completedCrop?.width ?? 0,
                  height: completedCrop?.height ?? 0,
                }}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <PrimaryButton
                variant="primary"
                text={t("Save")}
                disabled={!completedCrop?.width || !completedCrop?.height}
                onClick={() =>
                  generateDownload(
                    previewCanvasRef.current,
                    completedCrop,
                    file,
                    onFileChange
                  )
                }
              ></PrimaryButton>
            </div>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
}
