import { useState } from "react";
import { Pressable, Text, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppTextInput from "../components/AppTextInput";
import { router } from "expo-router";
import { useTaskStore } from '@/stores/taskStore';
import { useCategoryStore } from "@/stores/categoryStore";
import Picker from "../components/Picker";
import DateTimePicker from '@react-native-community/datetimepicker';

const COLORS = [
  '#FF6B6B', '#FF8E72', '#FFA500', '#FFD93D',
  '#6BCB77', '#4D96FF', '#6A5ACD', '#FF69B4',
  '#FF1493', '#00CED1', '#32CD32', '#FFB6C1'
];

export default function AddTaskScreen() {

    const { createTask } = useTaskStore();
    const { categories } = useCategoryStore();
    const [isPickerVisible, setIsPickerVisible] = useState(false);
    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        color: '',
        category: '',
        dueDate: '',
        completed: false,
    });

    const handleSubmit = () => {
        if (formData.title.trim() === '') {
            alert('Le titre de la tâche est requis.');
            return;
        }
        try {
            createTask(formData);
            router.back();
        } catch (e) {
            console.error('Error creating task:', e);
            alert('Une erreur est survenue lors de la création de la tâche.');
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
                        label="Titre de la tâche"
                        placeholder="Entrez le titre de la tâche"
                        value={formData.title}
                        onChangeText={(text) => setFormData({ ...formData, title: text })}
                    />
                    <AppTextInput
                        isTextArea={true}
                        label="Description de la tâche"
                        placeholder="Entrez la description de la tâche"
                        value={formData.description}
                        onChangeText={(text) => setFormData({ ...formData, description: text })}
                    />
                    <View style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        gap: 10,
                    }}>
                        <Pressable
                            onPress={() => setIsPickerVisible(!isPickerVisible)}
                            style={{
                                width: '100%',
                                paddingVertical: 12,
                                paddingHorizontal: 15,
                                backgroundColor: formData.category ? '#E3F2FD' : '#F8F8F8',
                                borderRadius: 10,
                                borderColor: '#007AFF',
                                borderWidth: 2,
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                flexDirection: 'row',
                            }}
                        >
                            <Text style={{ color: '#007AFF', fontSize: 16, fontWeight: '600' }}>
                                {formData.category || 'Sélectionnez une catégorie'}
                            </Text>
                            <Text style={{ color: '#007AFF', fontSize: 18 }}>
                                {isPickerVisible ? '▼' : '▶'}
                            </Text>
                        </Pressable>
                        {isPickerVisible && (
                            <View style={{
                                width: '100%',
                                backgroundColor: '#FFFFFF',
                                borderRadius: 10,
                                borderColor: '#007AFF',
                                borderWidth: 1,
                                overflow: 'hidden',
                                shadowColor: '#000000',
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.1,
                                shadowRadius: 3.84,
                                elevation: 3,
                                maxHeight: 250,
                            }}>
                                <Picker
                                    items={categories.map((cat) => cat.title)}
                                    selectedItem={formData.category}
                                    onPress={() => setIsPickerVisible(!isPickerVisible)}
                                    onValueChange={(value) => {
                                        setFormData({ ...formData, category: value });
                                        setIsPickerVisible(false);
                                    }}
                                />
                            </View>
                        )}
                    </View>
                    <View style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        gap: 10,
                    }}>
                        <Pressable
                            onPress={() => setIsDatePickerVisible(true)}
                            style={{
                                width: '100%',
                                paddingVertical: 12,
                                paddingHorizontal: 15,
                                backgroundColor: formData.dueDate ? '#E3F2FD' : '#F8F8F8',
                                borderRadius: 10,
                                borderColor: '#007AFF',
                                borderWidth: 2,
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                flexDirection: 'row',
                            }}
                        >
                            <Text style={{ color: '#007AFF', fontSize: 16, fontWeight: '600' }}>
                                {formData.dueDate 
                                    ? new Date(formData.dueDate).toLocaleDateString('fr-FR')
                                    : 'Sélectionnez une date'}
                            </Text>
                            <Text style={{ color: '#007AFF', fontSize: 18 }}>📅</Text>
                        </Pressable>
                        {isDatePickerVisible && (
                            <DateTimePicker
                                value={formData.dueDate ? new Date(formData.dueDate) : new Date()}
                                mode="date"
                                display="spinner"
                                onChange={(event, date) => {
                                    if (date) {
                                        setFormData({
                                            ...formData,
                                            dueDate: date.toISOString().split('T')[0],
                                        });
                                    }
                                    setIsDatePickerVisible(false);
                                }}
                            />
                        )}
                    </View>
                    <View style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        gap: 10,
                    }}>
                        <Text style={{
                            fontSize: 16,
                            color: '#333333',
                            fontWeight: '500',
                        }}>
                            Couleur
                        </Text>
                        <ScrollView 
                            horizontal 
                            showsHorizontalScrollIndicator={false}
                            style={{ width: '100%' }}
                        >
                            <View style={{
                                flexDirection: 'row',
                                gap: 10,
                                paddingRight: 10,
                            }}>
                                {COLORS.map((color) => (
                                    <Pressable
                                        key={color}
                                        onPress={() => setFormData({ ...formData, color })}
                                        style={{
                                            width: 50,
                                            height: 50,
                                            borderRadius: 25,
                                            backgroundColor: color,
                                            borderWidth: formData.color === color ? 4 : 2,
                                            borderColor: formData.color === color ? '#333333' : '#CCCCCC',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    >
                                        {formData.color === color && (
                                            <Text style={{ fontSize: 20, color: 'white' }}>✓</Text>
                                        )}
                                    </Pressable>
                                ))}
                            </View>
                        </ScrollView>
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
            </View>
        </SafeAreaView>
    );
}