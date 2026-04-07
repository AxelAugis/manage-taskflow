import { Text, TextInput, View } from "react-native";

interface AppTextInputProps {
    isTextArea?: boolean;
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    label: string;
}

export default function AppTextInput({ isTextArea = false, value, onChangeText, placeholder, label }: Readonly<AppTextInputProps>) {
    return (
        <View style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            gap: 10,
            }}
        >
            <Text
                style={{
                    fontSize: 16,
                    color: '#333333',
                    fontWeight: '500',
                    textAlign: 'center',
                }}
            >
                {label}
            </Text>
            <TextInput
                style={{
                    width: '100%',
                    height: isTextArea ? 100 : 40,
                    borderColor: '#CCCCCC',
                    borderWidth: 1,
                    borderRadius: 5,
                    paddingHorizontal: 10,
                }}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
            />

        </View>

    )
}