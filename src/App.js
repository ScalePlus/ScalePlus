import React, { useEffect } from "react";
import Cookies from "universal-cookie";
import MainRouter from "./Router";
import { GlobalStyle } from "./styles/CommonStyle";
import theme from "./theme";
import { initReactI18next } from "react-i18next";
import i18next from "i18next";
import Api from "./components/signin/api";

//language files
import en from "./lib/en.json";
import ar from "./lib/ar.json";

const cookies = new Cookies();

i18next
  .use({
    type: "languageDetector",
    async: true,
    detect: async (cb) => {
      if (cookies.get("language")) {
        if (theme.isRTL) {
          let link = document.createElement("link");
          link.id = "bootstrap-rtl";
          link.rel = "stylesheet";
          link.href =
            "https://cdn.rtlcss.com/bootstrap/v4.2.1/css/bootstrap.min.css";
          document.head.appendChild(link);
          document.getElementById("MainComponent").setAttribute("dir", "rtl");
        } else {
          let link = document.createElement("link");
          link.id = "bootstrap";
          link.rel = "stylesheet";
          link.href =
            "https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css";
          document.head.appendChild(link);
          document.getElementById("MainComponent").setAttribute("dir", "ltr");
        }
        cb(cookies.get("language"));
      } else {
        let link = document.createElement("link");
        link.id = "bootstrap";
        link.rel = "stylesheet";
        link.href =
          "https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css";
        document.head.appendChild(link);
        document.getElementById("MainComponent").setAttribute("dir", "ltr");
        cb("en");
      }
    },
    init: () => {},
    cacheUserLanguage: () => {},
  })
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    debug: true,
    resources: { en, ar },
  });

const App = () => {
  useEffect(() => {
    Api.getFileList().then((res) => {
      if (res && res.result && res.result.length) {
        let ar_record = res.result.find((each) => each.language === "ar"),
          en_record = res.result.find((each) => each.language === "en");

        if (
          ar_record &&
          ar_record.file_Data &&
          ar_record.file_Data.translation &&
          en_record &&
          en_record.file_Data &&
          en_record.file_Data.translation
        ) {
          i18next.addResources(
            "en",
            "translation",
            en_record.file_Data.translation
          );
          i18next.addResources(
            "ar",
            "translation",
            ar_record.file_Data.translation
          );
        }
        if (theme.isRTL) {
          i18next.changeLanguage("ar");
        } else {
          i18next.changeLanguage("en");
        }
      }
    });
  }, []);

  return (
    <div className="App">
      <GlobalStyle></GlobalStyle>
      <MainRouter />
    </div>
  );
};

export default App;
