import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "send-btn": {
        "marginTop": 15
    },
    "margined-section": {
        "marginTop": 20
    },
    "padded-sectionmargined": {
        "marginBottom": 5
    },
    "message-block": {
        "width": 100
    },
    "body": {
        "paddingBottom": 70
    },
    "message-bar": {
        "height": 70,
        "paddingTop": 13
    },
    "alert-chat": {
        "paddingTop": 5,
        "paddingRight": 5,
        "paddingBottom": 5,
        "paddingLeft": 5
    },
    "label-user": {
        "fontSize": "100%",
        "fontWeight": "normal",
        "marginBottom": 5
    },
    "nav-links": {
        "paddingTop": 10,
        "paddingRight": 10,
        "paddingBottom": 10,
        "paddingLeft": 10
    },
    "nav-links aactive": {
        "textDecoration": "underline"
    },
    "disabled": {
        "pointerEvents": "none",
        "opacity": 0.5
    },
    "fix-height": {
        "height": 100
    },
    "messages": {
        "height": 60 * vh,
        "overflow": "scroll",
        "marginTop": 10
    },
    "uploader-container": {
        "display": "inline-block !important",
        "position": "absolute",
        "top": 0,
        "width": 2 * vw,
        "opacity": 0
    },
    "message-input": {
        "width": 40 * vw,
        "display": "inline-block"
    },
    "image-box": {
        "height": 100,
        "width": 100
    },
    "field-wrapper": {
        "width": 2 * vw,
        "position": "relative",
        "height": 5 * vh,
        "marginLeft": 10
    }
});