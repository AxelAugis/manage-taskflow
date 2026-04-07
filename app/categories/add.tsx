import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppTextInput from "../components/AppTextInput";
import { router } from "expo-router";
import { useCategoryStore } from "@/stores/categoryStore";

export default function AddCategoryScreen() {

    const { createCategory } = useCategoryStore();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        color: '',
        dueDate: '',
        completed: false,
    });

    const handleSubmit = () => {
        if (formData.title.trim() === '') {
            alert('Le titre de la catégorie est requis.');
            return;
        }
        try {
            createCategory(formData);
            router.back();
        } catch (e) {
            console.error('Error creating category:', e);
            alert('Une erreur est survenue lors de la création de la catégorie.');
        }
    }

    return (
        <SafeAreaView
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
            <Pressable
                onPress={() => router.back()}
                style={{
                    position: 'absolute',
                    top: 60,
                    left: 20,
                    padding: 10,
                }}
            >
                <Text style={{ color: '#007AFF', fontSize: 16 }}>Retour</Text>
            </Pressable>
            <View 
                style={{
                    width: '90%',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 20,
                }}
            >
                <View 
                    style={{
                        width: '100%',
                        backgroundColor: '#fff',
                        padding: 20,
                        borderRadius: 10,
                        shadowColor: '#000000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.15,
                        shadowRadius: 3.84,
                        elevation: 5,
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        gap: 20,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: 'bold',
                            color: '#333333',
                            textAlign: 'center',
                        }}
                    >
                        Ajouter une tâche
                    </Text>
                    <AppTextInput
                        isTextArea={false}
                        label="Titre de la catégorie"
                        placeholder="Entrez le titre de la catégorie"
                        value={formData.title}
                        onChangeText={(text) => setFormData({ ...formData, title: text })}
                    />
                    <AppTextInput
                        isTextArea={true}
                        label="Description de la catégorie"
                        placeholder="Entrez la description de la catégorie"
                        value={formData.description}
                        onChangeText={(text) => setFormData({ ...formData, description: text })}
                    />

                </View>
                <Pressable
                    style={{
                        width: '100%',
                        padding: 15,
                        backgroundColor: '#007AFF',
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    onPress={handleSubmit}
                >
                    <Text style={{ color: '#FFFFFF', fontSize: 16 }}>Ajouter</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}