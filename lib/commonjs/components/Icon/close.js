"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_native_svg_1 = require("react-native-svg");
const Close = ({ color }) => (<react_native_svg_1.Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <react_native_svg_1.Path fill={color} d="M17.3422 15.7964C17.7651 16.2193 17.7651 16.9193 17.3422 17.3422C17.1234 17.5609 16.8464 17.663 16.5693 17.663C16.2922 17.663 16.0151 17.5609 15.7964 17.3422L11.8297 13.3755L7.86302 17.3422C7.64427 17.5609 7.36719 17.663 7.0901 17.663C6.81302 17.663 6.53594 17.5609 6.31719 17.3422C5.89427 16.9193 5.89427 16.2193 6.31719 15.7964L10.2839 11.8297L6.31719 7.86302C5.89427 7.4401 5.89427 6.7401 6.31719 6.31719C6.7401 5.89427 7.4401 5.89427 7.86302 6.31719L11.8297 10.2839L15.7964 6.31719C16.2193 5.89427 16.9193 5.89427 17.3422 6.31719C17.7651 6.7401 17.7651 7.4401 17.3422 7.86302L13.3755 11.8297L17.3422 15.7964Z"/>
  </react_native_svg_1.Svg>);
exports.default = (0, react_1.memo)(Close);
//# sourceMappingURL=close.js.map