"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setProgressStorage = exports.getProgressStorage = exports.clearProgressStorage = void 0;
/* eslint-disable global-require */
const constants_1 = require("../constants");
const clearProgressStorage = async () => {
    try {
        const AsyncStorage = require('@react-native-async-storage/async-storage').default;
        return AsyncStorage.removeItem(constants_1.STORAGE_KEY);
    }
    catch (error) {
        return null;
    }
};
exports.clearProgressStorage = clearProgressStorage;
const getProgressStorage = async () => {
    try {
        const AsyncStorage = require('@react-native-async-storage/async-storage').default;
        const progress = await AsyncStorage.getItem(constants_1.STORAGE_KEY);
        return progress ? JSON.parse(progress) : {};
    }
    catch (error) {
        return {};
    }
};
exports.getProgressStorage = getProgressStorage;
const setProgressStorage = async (user, lastSeen) => {
    const progress = await (0, exports.getProgressStorage)();
    progress[user] = lastSeen;
    try {
        const AsyncStorage = require('@react-native-async-storage/async-storage').default;
        await AsyncStorage.setItem(constants_1.STORAGE_KEY, JSON.stringify(progress));
        return progress;
    }
    catch (error) {
        return {};
    }
};
exports.setProgressStorage = setProgressStorage;
//# sourceMappingURL=storage.js.map