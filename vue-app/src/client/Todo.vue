<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">TODOアプリ</h1>

    <div class="flex items-center mb-4">
      <input
        type="text"
        v-model="newTodoTitle"
        placeholder="TODO項目を入力"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      <button
        @click="addTodo"
        class="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        追加
      </button>
    </div>

    <ul v-if="todos.length > 0" class="bg-white shadow-md rounded my-6">
      <li v-for="todo in todos" :key="todo.id" class="px-4 py-2 border-b border-gray-200 flex justify-between items-center">
        <span>{{ todo.title }}</span>
        <div>
          <button
            @click="deleteTodo(todo.id)"
            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            削除
          </button>
        </div>
      </li>
    </ul>
     <div v-else class="text-gray-500">
      TODO項目はありません。
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

interface Todo {
  id: number;
  title: string;
}

export default defineComponent({
  name: 'App',
  setup() {
    const todos = ref<Todo[]>([]);
    const newTodoTitle = ref('');
    let nextTodoId = ref(1);

    const addTodo = () => {
      if (newTodoTitle.value.trim() === '') {
        return;
      }
      todos.value.push({
        id: nextTodoId.value++,
        title: newTodoTitle.value,
      });
      newTodoTitle.value = '';
    };

    const deleteTodo = (id: number) => {
      todos.value = todos.value.filter((todo) => todo.id !== id);
    };

    return {
      todos,
      newTodoTitle,
      addTodo,
      deleteTodo,
    };
  },
});
</script>