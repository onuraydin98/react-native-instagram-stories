import React, { memo } from 'react';
import { PanGestureHandler, gestureHandlerRootHOC } from 'react-native-gesture-handler';
const GestureHandler = gestureHandlerRootHOC(({ children, onGestureEvent }) => (<PanGestureHandler onGestureEvent={onGestureEvent}>{children}</PanGestureHandler>));
export default memo(GestureHandler);
//# sourceMappingURL=gesture.js.map