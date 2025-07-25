"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
const constants_1 = require("../../core/constants");
exports.default = react_native_1.StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        left: constants_1.AVATAR_OFFSET,
        top: constants_1.AVATAR_OFFSET,
        position: 'absolute',
    },
    name: {
        alignItems: 'center',
    },
});
//# sourceMappingURL=Avatar.styles.js.map