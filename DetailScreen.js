import React from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SharedElement } from 'react-navigation-shared-element';

function DetailScreen({ route, navigation }) {
    return (
        <View style={styles.rootContainer}>
            <ScrollView>
                <Icon
                    name="close"
                    color="#fff"
                    size={25}
                    style={styles.iconContainer}
                    onPress={navigation.goBack} />
                <SharedElement id={`item.${route.params.item.id}.image`}>
                    <Image
                        style={styles.image}
                        source={{ uri: route.params.item.image }} />
                </SharedElement>
                <View style={styles.content}>
                    <SharedElement id={`item.${route.params.item.id}.name`}>
                        <View style={styles.nameContainer}>
                            <Icon name="map-marker-radius-outline" color="#fff" size={30} />
                            <Text style={styles.placename}>{route.params.item.name}</Text>
                        </View>
                    </SharedElement>
                    <Text style={styles.description}>{route.params.item.description}</Text>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        backgroundColor: '#000',
    },
    image: {
        alignSelf: 'center',
        width: Dimensions.get('window').width,
        aspectRatio: 1,
    },
    iconContainer: {
        position: 'absolute',
        top: 10,
        right: 20,
        zIndex: 1,
    },
    content: {
        padding: 20,
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
});

export default React.memo(DetailScreen);
