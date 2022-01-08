import React, { useCallback } from 'react';
import { Dimensions, FlatList, Image, Pressable, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SharedElement } from 'react-navigation-shared-element';

import { items } from '../config/constants';

const keyExtractor = (item) => `${item.id}`;

function ListScreen({ navigation }) {
    const renderItem = useCallback((item) => {
        const onPress = () => navigation.push('Detail', { item: item.item });

        return (
            <Pressable onPress={onPress} style={styles.itemContainer}>
                <SharedElement id={`item.${item.item.id}.image`}>
                    <Image style={styles.image} source={{ uri: item.item.image }}/>
                </SharedElement>
                <View style={styles.imageContentContainer}>
                    <SharedElement id={`item.${item.item.id}.name`}>
                        <View style={styles.placeContainer}>
                            <Icon name="map-marker-radius-outline" color="#fff" size={30} />
                            <Text style={styles.placename}>{item.item.name}</Text>
                        </View>
                    </SharedElement>
                </View>
            </Pressable>
        );
    }, [navigation]);

    return (
        <SafeAreaView style={styles.rootContainer}>
            <StatusBar hidden={true} />
            <FlatList
                data={items}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                ListHeaderComponent={<Text style={styles.headerTitle}>Tourist Spots</Text>} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        backgroundColor: '#000',
    },
    headerTitle: {
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 32,
        padding: 15,
    },
    itemContainer: {
        width: Dimensions.get('window').width,
        aspectRatio: 1,
        marginBottom: 20,
        paddingHorizontal: 20,
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
});

export default React.memo(ListScreen);
