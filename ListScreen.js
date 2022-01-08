import React, { useCallback } from 'react';
import { Dimensions, FlatList, Image, Pressable, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SharedElement } from 'react-navigation-shared-element';

const items = [
    {
        id: 1,
        name: 'Siargao',
        image:
            'https://images.pexels.com/photos/5457677/pexels-photo-5457677.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        description: `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed porta enim vel augue feugiat posuere. Ut in tincidunt felis. Quisque in diam neque. Curabitur tincidunt hendrerit efficitur. Nullam id sapien eu sapien commodo efficitur. Pellentesque nec nibh auctor, volutpat diam id, ullamcorper eros. Sed congue neque non est dictum, ac posuere ipsum vestibulum. Integer aliquam ligula vitae dignissim elementum. Sed feugiat egestas egestas. Curabitur maximus lobortis nunc. Pellentesque ac massa id neque elementum efficitur sed vitae orci. Cras in urna ut turpis sodales volutpat. Donec diam augue, interdum eu dignissim id, venenatis eu nulla.
    `,
    },
    {
        id: 2,
        name: 'El Nido',
        image:
            'https://images.pexels.com/photos/1076240/pexels-photo-1076240.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        description: `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed porta enim vel augue feugiat posuere. Ut in tincidunt felis. Quisque in diam neque. Curabitur tincidunt hendrerit efficitur. Nullam id sapien eu sapien commodo efficitur. Pellentesque nec nibh auctor, volutpat diam id, ullamcorper eros. Sed congue neque non est dictum, ac posuere ipsum vestibulum. Integer aliquam ligula vitae dignissim elementum. Sed feugiat egestas egestas. Curabitur maximus lobortis nunc. Pellentesque ac massa id neque elementum efficitur sed vitae orci. Cras in urna ut turpis sodales volutpat. Donec diam augue, interdum eu dignissim id, venenatis eu nulla.
    `,
    },
    {
        id: 3,
        name: 'Bohol',
        image: 'https://images.pexels.com/photos/5656999/pexels-photo-5656999.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        description: `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed porta enim vel augue feugiat posuere. Ut in tincidunt felis. Quisque in diam neque. Curabitur tincidunt hendrerit efficitur. Nullam id sapien eu sapien commodo efficitur. Pellentesque nec nibh auctor, volutpat diam id, ullamcorper eros. Sed congue neque non est dictum, ac posuere ipsum vestibulum. Integer aliquam ligula vitae dignissim elementum. Sed feugiat egestas egestas. Curabitur maximus lobortis nunc. Pellentesque ac massa id neque elementum efficitur sed vitae orci. Cras in urna ut turpis sodales volutpat. Donec diam augue, interdum eu dignissim id, venenatis eu nulla.
    `,
    },
    {
        id: 4,
        name: 'Batanes',
        image: 'https://images.pexels.com/photos/3824154/pexels-photo-3824154.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        description: `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed porta enim vel augue feugiat posuere. Ut in tincidunt felis. Quisque in diam neque. Curabitur tincidunt hendrerit efficitur. Nullam id sapien eu sapien commodo efficitur. Pellentesque nec nibh auctor, volutpat diam id, ullamcorper eros. Sed congue neque non est dictum, ac posuere ipsum vestibulum. Integer aliquam ligula vitae dignissim elementum. Sed feugiat egestas egestas. Curabitur maximus lobortis nunc. Pellentesque ac massa id neque elementum efficitur sed vitae orci. Cras in urna ut turpis sodales volutpat. Donec diam augue, interdum eu dignissim id, venenatis eu nulla.
    `,
    },
];

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
