import { useState } from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import { Swatches, Preview, OpacitySlider, HueSlider } from 'reanimated-color-picker';
import Animated from 'react-native-reanimated';

interface AppColorPickerProps {
    color: string;
    onColorChange: (color: string) => void;
}

export default function AppColorPicker({ color, onColorChange }: Readonly<AppColorPickerProps>) {
    const [showPicker, setShowPicker] = useState(false);
    const [selectedColor, setSelectedColor] = useState(color);

    const handleColorSelect = (newColor: string) => {
        setSelectedColor(newColor);
        onColorChange(newColor);
        setShowPicker(false);
    };

    return (
        <View style={styles.container}>
            <Pressable
                style={[styles.colorButton, { backgroundColor: selectedColor }]}
                onPress={() => setShowPicker(!showPicker)}
            >
                <Text style={styles.colorText}>{selectedColor}</Text>
            </Pressable>

            {showPicker && (
                <Animated.View style={styles.pickerContainer}>
                    <Preview />
                    <HueSlider />
                    <OpacitySlider />
                    <Swatches colors={['#FF5733', '#33FF57', '#3357FF', '#FF33F1', '#F1FF33']} />
                    <Pressable onPress={() => setShowPicker(false)}>
                        <Text style={styles.closeText}>Fermer</Text>
                    </Pressable>
                </Animated.View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { paddingVertical: 12 },
    colorButton: { padding: 12, borderRadius: 8, alignItems: 'center' },
    colorText: { color: '#fff', fontWeight: 'bold' },
    pickerContainer: { marginTop: 12, padding: 12, backgroundColor: '#f5f5f5', borderRadius: 8 },
    closeText: { marginTop: 8, textAlign: 'center', color: '#666', fontWeight: '600' },
});