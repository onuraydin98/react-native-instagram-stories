import React, {
  FC, memo, useMemo, useState,
} from 'react';
import Animated, {
  cancelAnimation, interpolate, runOnJS, useAnimatedProps, useAnimatedReaction, useAnimatedStyle,
  useSharedValue, withRepeat, withTiming,
} from 'react-native-reanimated';
import {
  Circle, Defs, LinearGradient, Stop, Svg,
} from 'react-native-svg';
import {
  AVATAR_SIZE, LOADER_ID, LOADER_URL, STROKE_WIDTH,
} from '../../core/constants';
import { StoryLoaderProps } from '../../core/dto/componentsDTO';
import { View } from 'react-native';
import { Image } from 'react-native';

const AnimatedCircle = Animated.createAnimatedComponent( Circle );
const AnimatedSvg = Animated.createAnimatedComponent( Svg );

const Loader: FC<StoryLoaderProps> = ( {
  loading, color, size = AVATAR_SIZE + 10,
} ) => {

  const RADIUS = useMemo( () => ( size - STROKE_WIDTH ) / 2, [ size ] );
  const CIRCUMFERENCE = useMemo( () => RADIUS * 2 * Math.PI, [ RADIUS ] );

  const [ colors, setColors ] = useState<string[]>( color.value );

  const rotation = useSharedValue( 0 );
  const progress = useSharedValue( 0 );

  const animatedProps = useAnimatedProps( () => ( {
    strokeDashoffset: interpolate( progress.value, [ 0, 1 ], [ 0, CIRCUMFERENCE * 2 / 3 ] ),
  } ) );
  const animatedStyles = useAnimatedStyle( () => ( {
    transform: [ { rotate: `${rotation.value}deg` } ],
  } ) );

  const startAnimation = () => {

    'worklet';

    progress.value = withRepeat( withTiming( 1, { duration: 3000 } ), -1, true );
    rotation.value = withRepeat( withTiming( 720, { duration: 3000 } ), -1, false, () => {

      rotation.value = 0;

    } );

  };

  const stopAnimation = () => {

    'worklet';

    cancelAnimation( progress );
    progress.value = withTiming( 0 );

    cancelAnimation( rotation );
    rotation.value = withTiming( 0 );

  };

  const onColorChange = ( newColors: string[] ) => {

    'worklet';

    if ( JSON.stringify( colors ) === JSON.stringify( newColors ) ) {

      return;

    }

    runOnJS( setColors )( newColors );

  };

  useAnimatedReaction(
    () => loading.value,
    ( res ) => ( res ? startAnimation() : stopAnimation() ),
    [ loading.value ],
  );
  useAnimatedReaction(
    () => color.value,
    ( res ) => onColorChange( res ),
    [ color.value ],
  );

  return (
    <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
      <Image
        source={require("../../assets/loading3.gif")}
        style={{ width: size * 1.2, height: size * 1.2 }}
        resizeMode="contain"
      />
    </View>

  );

};

export default memo( Loader );
