import React, { Component } from "react";
import { PropTypes } from "prop-types";
import theme from "../../theme";

export default class Step extends Component {
  constructor() {
    super();
    this.getStyles = this.getStyles.bind(this);
  }

  getStyles() {
    const {
      activeColor,
      completeColor,
      defaultColor,
      circleFontColor,
      activeTitleColor,
      completeTitleColor,
      defaultTitleColor,
      size,
      circleFontSize,
      titleFontSize,
      circleTop,
      titleTop,
      width,
      completeOpacity,
      activeOpacity,
      defaultOpacity,
      completeTitleOpacity,
      activeTitleOpacity,
      defaultTitleOpacity,
      barStyle,
      defaultBarColor,
      completeBarColor,
      defaultBorderColor,
      completeBorderColor,
      activeBorderColor,
      defaultBorderStyle,
      completeBorderStyle,
      activeBorderStyle,
      // lineMarginOffset,
      defaultBorderWidth,
      borderTopWidth,
      isLeftAligned,
    } = this.props;

    return {
      step: {
        width: `${width}%`,
        display: "table-cell",
        position: "relative",
        paddingTop: circleTop,
        cursor: "pointer",
      },
      circle: {
        width: size,
        height: size,
        margin: isLeftAligned ? 0 : "0 auto",
        backgroundColor: defaultColor,
        borderRadius: "50%",
        textAlign: isLeftAligned ? (theme.isLTR ? "left" : "right") : "center",
        padding: 1,
        fontSize: circleFontSize,
        color: circleFontColor,
        opacity: defaultOpacity,
        borderWidth: defaultBorderColor ? defaultBorderWidth : 0,
        borderColor: defaultBorderColor,
        borderStyle: defaultBorderStyle,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
      activeCircle: {
        backgroundColor: activeColor,
        opacity: activeOpacity,
        borderWidth: activeBorderColor ? defaultBorderWidth : 0,
        borderColor: activeBorderColor,
        borderStyle: activeBorderStyle,
      },
      completedCircle: {
        backgroundColor: completeColor,
        opacity: completeOpacity,
        borderWidth: completeBorderColor ? defaultBorderWidth : 0,
        borderColor: completeBorderColor,
        borderStyle: completeBorderStyle,
      },
      index: {
        lineHeight: `${size + circleFontSize / 4}px`,
        color: circleFontColor,
      },
      label: {
        fontSize: titleFontSize,
        textAlign: isLeftAligned ? (theme.isLTR ? "left" : "right") : "center",
        marginTop: `-${circleTop + size}px`,
        marginBottom: `${size + 14}px`,
      },
      title: {
        marginTop: titleTop,
        fontSize: titleFontSize,
        fontWeight: "300",
        textAlign: isLeftAligned ? (theme.isLTR ? "left" : "right") : "center",
        display: "block",
        color: defaultTitleColor,
        opacity: defaultTitleOpacity,
      },
      activeTitle: {
        color: activeTitleColor,
        opacity: activeTitleOpacity,
      },
      completedTitle: {
        color: completeTitleColor,
        opacity: completeTitleOpacity,
      },
      leftBar: {
        position: "absolute",
        top: circleTop + size / 2,
        height: 1,
        borderTopStyle: barStyle,
        borderTopWidth: borderTopWidth ? borderTopWidth : 1,
        borderTopColor: defaultBarColor,
        left: theme.isLTR ? 0 : isLeftAligned ? "100%" : "50%",
        right: theme.isLTR ? (isLeftAligned ? "100%" : "50%") : 0,
        marginRight: theme.isLTR && size / 2,
        marginLeft: theme.isRTL && size / 2,
        opacity: defaultOpacity,
      },
      rightBar: {
        position: "absolute",
        top: circleTop + size / 2,
        height: 1,
        borderTopStyle: barStyle,
        borderTopWidth: borderTopWidth ? borderTopWidth : 1,
        borderTopColor: defaultBarColor,
        right: theme.isLTR ? 0 : isLeftAligned ? 0 : "50%",
        left: theme.isLTR ? (isLeftAligned ? 0 : "50%") : 0,
        marginLeft: theme.isLTR && size / 2,
        marginRight: theme.isRTL && size / 2,
        opacity: defaultOpacity,
      },
      completedBar: {
        borderTopStyle: barStyle,
        borderTopWidth: borderTopWidth ? borderTopWidth : 1,
        borderTopColor: completeBarColor,
        opacity: completeOpacity,
      },
    };
  }

  render() {
    const {
      icon,
      index,
      active,
      completed,
      first,
      isLast,
      onClick,
      showNumber,
      showStartEndLabel,
      title,
    } = this.props;

    const styles = this.getStyles();
    const circleStyle = Object.assign(
      styles.circle,
      completed ? styles.completedCircle : {},
      active ? styles.activeCircle : {}
    );
    const labelStyle = Object.assign(styles.label);
    const titleStyle = Object.assign(
      styles.title,
      completed ? styles.completedTitle : {},
      active ? styles.activeTitle : {}
    );
    const leftStyle = Object.assign(
      styles.leftBar,
      active || completed ? styles.completedBar : {}
    );
    const rightStyle = Object.assign(
      styles.rightBar,
      completed ? styles.completedBar : {}
    );

    const stepContent = icon ? (
      <img src={icon} alt={index + 1} />
    ) : showNumber ? (
      index + 1
    ) : null;

    return (
      <div style={styles.step}>
        <div
          style={circleStyle}
          onClick={active || completed ? (e) => onClick(e) : () => {}}
        >
          <span
            onClick={active || completed ? (e) => onClick(e) : () => {}}
            style={styles.index}
          >
            {stepContent}
          </span>
        </div>

        {first && showStartEndLabel && <div style={labelStyle}>Start</div>}
        {isLast && showStartEndLabel && <div style={labelStyle}>Finish</div>}

        {title && <div style={titleStyle}>{title}</div>}

        {!first && <div style={leftStyle}></div>}
        {!isLast && <div style={rightStyle}></div>}
      </div>
    );
  }
}

Step.defaultProps = {
  activeColor: "#5096FF",
  completeColor: "#5096FF",
  defaultColor: "#E0E0E0",
  activeTitleColor: "#000",
  completeTitleColor: "#000",
  defaultTitleColor: "#757575",
  circleFontColor: "#FFF",
  size: 32,
  circleFontSize: 16,
  titleFontSize: 16,
  circleTop: 24,
  titleTop: 8,
  defaultBarColor: "#E0E0E0",
  barStyle: "solid",
  borderStyle: "solid",
  // lineMarginOffset: 4,
  defaultBorderWidth: 3,
};

Step.propTypes = {
  width: PropTypes.number.isRequired,
  activeColor: PropTypes.string,
  completeColor: PropTypes.string,
  defaultColor: PropTypes.string,
  activeTitleColor: PropTypes.string,
  completeTitleColor: PropTypes.string,
  defaultTitleColor: PropTypes.string,
  circleFontColor: PropTypes.string,
  size: PropTypes.number,
  circleFontSize: PropTypes.number,
  circleTop: PropTypes.number,
  titleTop: PropTypes.number,
  title: PropTypes.string,
  index: PropTypes.number,
  active: PropTypes.bool,
  completed: PropTypes.bool,
  first: PropTypes.bool,
  isLast: PropTypes.bool,
  completeOpacity: PropTypes.string,
  activeOpacity: PropTypes.string,
  defaultOpacity: PropTypes.string,
  completeTitleOpacity: PropTypes.string,
  activeTitleOpacity: PropTypes.string,
  defaultTitleOpacity: PropTypes.string,
  barStyle: PropTypes.string,
  defaultBarColor: PropTypes.string,
  completeBarColor: PropTypes.string,
  defaultBorderColor: PropTypes.string,
  completeBorderColor: PropTypes.string,
  activeBorderColor: PropTypes.string,
  defaultBorderStyle: PropTypes.string,
  completeBorderStyle: PropTypes.string,
  activeBorderStyle: PropTypes.string,
  // lineMarginOffset: PropTypes.number,
  defaultBorderWidth: PropTypes.number,
};
