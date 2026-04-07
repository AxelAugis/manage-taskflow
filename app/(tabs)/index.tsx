import { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useTaskStore } from '@/stores/taskStore';
import AddLink from '../components/AddLink';
import Task from '../components/Task';


export default function TasksScreen() {
  const { tasks, isLoading, error, fetchTasks, deleteTask, updateTask } = useTaskStore();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading tasks...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Task
            id={item.id}
            title={item.title}
            description={item.description}
            color={item.color}
            dueDate={item.dueDate}
            completed={item.completed}
            category={item.category}
            onToggleComplete={(id, completed) => updateTask(id, { completed })}
            onDelete={(id) => deleteTask(id)}
          />
        )}
      />
      <AddLink url="/tasks/add" />
    </View>
  );
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