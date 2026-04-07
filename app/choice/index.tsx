import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddChoiceScreen() {
    return (
        <SafeAreaView
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 20 }}>
            <Pressable
                onPress={() => router.push('/tasks/add')}
                style={{
                    padding: 20,
                    backgroundColor: '#007AFF',
                    borderRadius: 8,
                }}
            >
                <Text style={{ color: '#fff', fontSize: 18 }}>Ajouter une tâche</Text>
            </Pressable>
            <Pressable
                onPress={() => router.push('/categories/add')}
                style={{
                    padding: 20,
                    backgroundColor: '#34C759',
                    borderRadius: 8,
                }}
            >
                <Text style={{ color: '#fff', fontSize: 18 }}>Ajouter une catégorie</Text>
            </Pressable>
        </View>
        </SafeAreaView>
    )
}
