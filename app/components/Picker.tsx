import { useState } from "react";
import { Pressable, ScrollView, Text } from "react-native";

export interface PickerProps {
    items: string[];
    selectedItem: string;
    onPress: () => void;
    onValueChange: (value: string) => void;
}

export default function Picker({ items, selectedItem, onPress, onValueChange }: Readonly<PickerProps>) {

    const [isPickerVisible, setIsPickerVisible] = useState(false);

    return (
        <ScrollView>
            <Pressable
                onPress={() => {
                    onPress();
                    setIsPickerVisible(!isPickerVisible);
                }}
                style={{
                    padding: 12,
                    borderBottomColor: '#F0F0F0',
                    borderBottomWidth: 1,
                    backgroundColor: selectedItem === '' ? '#E3F2FD' : '#FFFFFF',
                }}
            >
                <Text style={{
                    fontSize: 14,
                    color: selectedItem === '' ? '#007AFF' : '#333333',
                    fontWeight: selectedItem === '' ? '600' : '400',
                }}>
                    Aucune catégorie
                </Text>
            </Pressable>
            {items.map((item) => (
                <Pressable
                    key={item}
                    onPress={() => {
                        onValueChange(item);
                        setIsPickerVisible(false);
                    }}
                    style={{
                        padding: 12,
                        borderBottomColor: '#F0F0F0',
                        borderBottomWidth: 1,
                        backgroundColor: selectedItem === item ? '#E3F2FD' : '#FFFFFF',
                    }}
                >
                    <Text style={{
                        fontSize: 14,
                        color: selectedItem === item ? '#007AFF' : '#333333',
                        fontWeight: selectedItem === item ? '600' : '400',
                    }}>
                        {item}
                    </Text>
                </Pressable>
            ))}
        </ScrollView>
    )
}