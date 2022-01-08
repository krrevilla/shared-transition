import React from 'react';
import { Dimensions, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SharedElement } from 'react-navigation-shared-element';
import Animated, { Extrapolate, FadeInRight, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';

/**
 * Using SafeAreaView causes the image to bounce at the top
 */

const headerHeight = 50;
const windowWidth = Dimensions.get('window').width;
const imageSize = windowWidth - 20;
const headerAnimationThreshold = imageSize + headerHeight;
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function DetailScreen({ route, navigation }) {
    const { top, bottom } = useSafeAreaInsets();
    const scrollY = useSharedValue(0);

    const scrollHandler = useAnimatedScrollHandler((event) => {
        scrollY.value = event.contentOffset.y;
    });

    const imageAnimatedStyles = useAnimatedStyle(() => {
        const scaleValue = interpolate(scrollY.value, [0, imageSize], [1, 0], { extrapolateLeft: Extrapolate.CLAMP });
        const opacityValue = interpolate(scrollY.value, [0, imageSize / 2], [1, 0]);
        const zIndex = interpolate(scrollY.value, [0, imageSize], [2, 0]);

        return {
            transform: [{ scale: scaleValue }],
            opacity: opacityValue,
            zIndex,
        };
    });

    const titleContainerAnimatedStyles = useAnimatedStyle(() => {
        const translateY = interpolate(scrollY.value, [headerAnimationThreshold, headerAnimationThreshold * 1.25], [15, 0], { extrapolateRight: Extrapolate.CLAMP });
        const opacity = interpolate(scrollY.value, [headerAnimationThreshold, headerAnimationThreshold * 1.25], [0.25, 1]);

        return {
            transform: [{ translateY }],
            opacity,
        };
    }, []);

    return (
        <View style={StyleSheet.flatten([styles.rootContainer, { paddingTop: top, paddingBottom: bottom }])}>
            <View style={styles.header}>
                <Animated.View style={[styles.titleContainer, titleContainerAnimatedStyles]}>
                    <Icon name="map-marker-radius-outline" color="#fff" size={30} />
                    <Text style={styles.headerTitle}>{route.params.item.name}</Text>
                </Animated.View>
                <AnimatedPressable
                    entering={FadeInRight.delay(100)}
                    style={styles.iconContainer}
                    onPress={navigation.goBack}>
                    <Icon
                        name="close"
                        color="#fff"
                        size={25} />
                </AnimatedPressable>
            </View>

            <Animated.View style={[styles.imageContainer, { marginTop: top + 50 }, imageAnimatedStyles]}>
                <SharedElement id={`item.${route.params.item.id}.image`}>
                    <Image
                        style={styles.image}
                        source={{ uri: route.params.item.image }} />
                </SharedElement>
            </Animated.View>

            <View>
                <LinearGradient colors={['#000', 'transparent']} style={styles.topLinearGradient} />
                <Animated.ScrollView
                    onScroll={scrollHandler}
                    scrollEventThrottle={16}
                    contentContainerStyle={styles.contentContainer}>
                    <SharedElement id={`item.${route.params.item.id}.name`}>
                        <View style={styles.nameContainer}>
                            <Icon name="map-marker-radius-outline" color="#fff" size={30} />
                            <Text style={styles.placename}>{route.params.item.name}</Text>
                        </View>
                    </SharedElement>
                    <Text style={styles.description}>{route.params.item.description}</Text>
                </Animated.ScrollView>
            </View>

            <LinearGradient colors={['transparent', '#000']} style={styles.bottomLinearGradient} />
        </View>
    );
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        backgroundColor: '#000',
    },
    header: {
        height: headerHeight,
        alignItems: 'center',
        paddingHorizontal: 20,
        flexDirection: 'row',
    },
    titleContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    headerTitle: {
        fontSize: 22,
        color: '#fff',
        fontWeight: '600',
    },
    iconContainer: {
        width: 50,
        alignItems: 'flex-end',
    },
    imageContainer: {
        width: windowWidth,
        height: imageSize,
        paddingHorizontal: 20,
        position: 'absolute',
    },
    image: {
        alignSelf: 'center',
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    contentContainer: {
        paddingHorizontal: 20,
        paddingTop: windowWidth,
        paddingBottom: headerHeight * 2,
    },
    description: {
        color: '#fff',
        fontWeight: '700',
        lineHeight: 20,
        letterSpacing: 1.5,
    },
    nameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    placename: {
        fontSize: 22,
        color: '#fff',
        fontWeight: '600',
        marginLeft: 10,
    },
    topLinearGradient: {
        height: headerHeight,
        width: windowWidth,
        position: 'absolute',
        top: 0,
        zIndex: 1,
    },
    bottomLinearGradient: {
        height: headerHeight * 2,
        width: '100%',
        position: 'absolute',
        bottom: 0,
    },
});

export default React.memo(DetailScreen);
