import React, { useCallback, useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';

import Card from '../components/Card';
import { items } from '../config/constants';

function ListScreen({ navigation }) {
    const [data, setData] = useState(items);

    const onShift = useCallback(() => {
        setData((prevValue) => {
            const value = JSON.parse(JSON.stringify(prevValue));
            const firstElement = value.shift();

            value.push(firstElement);

            return value;
        });
    }, []);

    const renderItem = (item, index) => {
        const onPress = () => navigation.push('Detail', { item });

        return (
            <Card
                key={item.id}
                id={item.id}
                isVisible={data[0].id === item.id}
                index={index}
                name={item.name}
                image={item.image}
                onPress={onPress}
                onShift={onShift} />
        );
    };

    return (
        <SafeAreaView style={styles.rootContainer}>
            <StatusBar hidden={true} />
            <Text style={styles.headerTitle}>Tourist Spots</Text>
            <View style={styles.content}>
                {data.map(renderItem)}
            </View>
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
    content: {
        flex: 1,
        overflow: 'hidden',
    },
});

export default React.memo(ListScreen);
