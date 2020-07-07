export default {
  isRTL: localStorage.getItem("language") === "ar",
  isLTR: localStorage.getItem("language") !== "ar",
  colors: {
    white: "#ffffff",
    black: "#000000",
    transparent: "#ffffff00",
    yellow: "#FFC000",
    gray: "#7f7f7f",
    borderGrey: "#808080",
    lightWhite: "#fdfdfd",
    mediumgray: "#E0E0E0",
    lightSilver: "#d8d8d8",
    snow: "#fbfbfb",
    whiteSmokeTint1: "#f3f3f3",
    whiteSmokeTint2: "#f5f5f5",
    whiteSmokeTint3: "#f6f6f6",
    whiteSmokeTint4: "#f7f7f7",
    whiteSmokeTint5: "#efefef",
    alabaster: "#f9f9f9",
    amaranth: "#dc3545",
    gray98: "#fafafa",
    grey: "#818181",
    whisper: "#eeeeee",
    aliceBlue: "#dcf2ff",
    peachYellow: "#f8d9a6",
    sweetPink: "#e49393",
    mediumAquamarine: "#66e397",
  },
  fontFamily: {
    regular: "OpenSans-Regular",
    bold: "OpenSans-Bold",
    semi_bold: "OpenSans-SemiBold",
    rockwell_regular: "Rockwell-Regular",
  },
  fontSize: {
    extraSmall: "0.688rem",
    small: "0.75rem",
    regular: "0.875rem",
    semiRegular: "1rem",
    mediumRegular: "1.125rem",
    medium: "1.25rem",
    extraMedium: "1.375rem",
    title: "1.5rem",
    large: "1.75rem",
    semiLarge: "2rem",
    mediumLarge: "2.25rem",
    extraLarge: "2.5rem",
    xxLarge: "2.875rem",
  },
};
