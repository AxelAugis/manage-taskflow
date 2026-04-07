import { router, type Href } from "expo-router";
import { Plus } from "lucide-react-native";
import { Pressable, StyleSheet } from "react-native";


export interface AddLinkProps {
    url: string;
}

export default function AddLink({ url }: Readonly<AddLinkProps>) {
    return (
        <Pressable
            style={styles.fab} 
            testID='add-button'
                    onPress={() => router.push(url as Href)}
        >
            <Plus size={24} color="#FFFFFF" />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        bottom: 24,
        right: 24,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#007AFF',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
});