"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
const constants_1 = require("../../core/constants");
exports.default = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
    },
    absolute: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: constants_1.WIDTH,
        height: constants_1.HEIGHT,
    },
    bgAnimation: react_native_1.StyleSheet.absoluteFillObject,
});
//# sourceMappingURL=Modal.styles.js.map