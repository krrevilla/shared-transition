import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SharedElement } from 'react-navigation-shared-element';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useCallback } from 'react/cjs/react.development';

const windowWidth = Dimensions.get('window').width;

function Card({ onShift, ...props }) {
    const positionX = useSharedValue(0);
    const [shouldShift, setShouldShift] = useState(false);

    useEffect(() => {
        if (shouldShift && props.isVisible) {
            onShift();
        }
    }, [props.isVisible, shouldShift, onShift]);

    useEffect(() => {
        if (!props.isVisible) {
            setShouldShift(false);
        }
    }, [props.isVisible]);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: positionX.value }],
        };
    });

    const onTrigger = useCallback(() => {
        setShouldShift(true);
    }, []);

    const panGesture = Gesture.Pan()
        .enabled(!shouldShift)
        .onUpdate((e) => {
            positionX.value = e.translationX;

            if (Math.abs(e.translationX) > windowWidth * 0.55) {
                positionX.value = withTiming(0, { duration: 500 });
                runOnJS(onTrigger)();
            }
        })
        .onEnd(() => {
            positionX.value = withTiming(0, { duration: 500 });
        });

    return (
        <GestureDetector gesture={panGesture}>
            <Animated.View style={[styles.itemContainer, animatedStyle, { zIndex: 1 - props.index }]}>
                <Pressable onPress={props.onPress}>
                    <SharedElement id={`item.${props.id}.image`}>
                        <Image style={styles.image} source={{ uri: props.image }} />
                    </SharedElement>
                    <View style={styles.imageContentContainer}>
                        <SharedElement id={`item.${props.id}.name`}>
                            <View style={styles.placeContainer}>
                                <Icon name="map-marker-radius-outline" color="#fff" size={30} />
                                <Text style={styles.placename}>{props.name}</Text>
                            </View>
                        </SharedElement>
                    </View>
                </Pressable>
            </Animated.View>
        </GestureDetector>
    );
}


const styles = StyleSheet.create({
    itemContainer: {
        width: Dimensions.get('window').width,
        aspectRatio: 1,
        paddingHorizontal: 20,

        position: 'absolute',
        top: 30,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    imageContentContainer: {
        flex: 1,
        padding: 20,
        zIndex: 1,
        position: 'absolute',
        bottom: 0,
        left: 15,
    },
    placeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    placename: {
        fontSize: 22,
        color: '#fff',
        fontWeight: '600',
        marginLeft: 10,
    },

    shiftButton: {
        backgroundColor: '#7C99AC',
        marginTop: 20,
        alignSelf: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    shiftTitle: {
        fontWeight: 'bold',
        color: '#D3DEDC',
    },
});

Card.propTypes = {
    id: PropTypes.number.isRequired,
    isVisible: PropTypes.bool.isRequired,
    index: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    onShift: PropTypes.func.isRequired,
};

export default React.memo(Card);
