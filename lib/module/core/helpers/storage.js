/* eslint-disable global-require */
import { STORAGE_KEY } from '../constants';
export const clearProgressStorage = async () => {
    try {
        const AsyncStorage = require('@react-native-async-storage/async-storage').default;
        return AsyncStorage.removeItem(STORAGE_KEY);
    }
    catch (error) {
        return null;
    }
};
export const getProgressStorage = async () => {
    try {
        const AsyncStorage = require('@react-native-async-storage/async-storage').default;
        const progress = await AsyncStorage.getItem(STORAGE_KEY);
        return progress ? JSON.parse(progress) : {};
    }
    catch (error) {
        return {};
    }
};
export const setProgressStorage = async (user, lastSeen) => {
    const progress = await getProgressStorage();
    progress[user] = lastSeen;
    try {
        const AsyncStorage = require('@react-native-async-storage/async-storage').default;
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
        return progress;
    }
    catch (error) {
        return {};
    }
};
//# sourceMappingURL=storage.js.map