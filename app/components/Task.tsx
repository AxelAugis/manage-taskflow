import { useTaskStore } from "@/stores/taskStore";
import { Trash2 } from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";

export interface TaskProps {
    id: string;
    title: string;
    description?: string;
    color: string;
    dueDate?: string;
    completed: boolean;
    category: string;
    onToggleComplete: (id: string, completed: boolean) => void;
    onDelete: (id: string) => void;
}


export default function Task({ id, title, description, color, dueDate, completed, category, onToggleComplete, onDelete }: Readonly<TaskProps>) {
    const { deleteTask, updateTask } = useTaskStore();


    const getTaskBorderColor = (hexColor: string) => {
    return hexColor || '#007AFF';
    };

    return (
        <View style={[
            styles.taskItem,
            { borderLeftColor: getTaskBorderColor(color) }
        ]}>
            <Pressable
                onPress={() => updateTask(id, { completed: !completed })}
                style={styles.taskContent}>
                <Text style={[
                styles.taskTitle,
                completed && styles.completedTask
                ]}>
                {title}
                </Text>
                {description ? (
                <Text style={[
                    styles.taskDescription,
                    completed && styles.completedDescription
                ]} numberOfLines={2}>
                    {description}
                </Text>
                ) : null}
                <View style={styles.taskMeta}>
                {dueDate && (
                    <Text style={styles.taskMetaText}>
                    📅 {new Date(dueDate).toLocaleDateString('fr-FR')}
                    </Text>
                )}
                <Text style={styles.taskMetaText}>
                🏷️ {category}
                </Text>
                </View>
            </Pressable>
            <Pressable
                onPress={() => deleteTask(id)}
                testID={`delete-button-${id}`}
                style={styles.deleteButton}>
                <Trash2 size={20} color="#FF3B30" />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F7',
        paddingTop: 8,
    },
    taskItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: '#FFFFFF',
        padding: 16,
        marginHorizontal: 16,
        marginVertical: 8,
        borderRadius: 12,
        borderLeftWidth: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
        elevation: 2,
        gap: 12,
    },
    taskContent: {
        flex: 1,
    },
    taskTitle: {
        fontSize: 17,
        fontWeight: '700',
        color: '#1C1C1E',
        marginBottom: 6,
        letterSpacing: 0.3,
    },
    completedTask: {
        textDecorationLine: 'line-through',
        color: '#A9A9A9',
    },
    completedDescription: {
        color: '#C7C7CC',
    },
    taskDescription: {
        fontSize: 15,
        color: '#555555',
        marginBottom: 8,
        lineHeight: 20,
    },
    taskMeta: {
        flexDirection: 'column',
        gap: 4,
        marginTop: 4,
    },
    taskMetaText: {
        fontSize: 13,
        color: '#8E8E93',
        fontWeight: '500',
    },
    deleteButton: {
        padding: 8,
        justifyContent: 'center',
    },
    errorText: {
        color: '#FF3B30',
        textAlign: 'center',
        marginTop: 16,
    },
});