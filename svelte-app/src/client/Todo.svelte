<script lang="ts">
let todos = []; // TODOリストを格納する配列
let newTodoTitle = ''; // 新しいTODOのタイトル用変数

// TODOを追加する関数
function addTodo() {
  if (newTodoTitle.trim() !== '') { // 空文字でないかチェック
    todos = [...todos, { title: newTodoTitle }]; // todos配列に新しいTODOオブジェクトを追加
    newTodoTitle = ''; // 入力欄をクリア
  }
}

// TODOを削除する関数
function deleteTodo(index) {
  todos = todos.filter((_, i) => i !== index); // 指定されたindex以外の要素でtodos配列をフィルタリング
}
</script>

<div class="container mx-auto p-4">
  <h1 class="text-2xl font-bold mb-4">TODOアプリ</h1>

  <div class="flex mb-4">
    <input
      type="text"
      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      placeholder="TODOを入力"
      bind:value={newTodoTitle}
    />
    <button
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
      on:click={addTodo}
    >
      追加
    </button>
  </div>

  {#each todos as todo, index (index)} <!-- todos配列をループ処理 -->
    <div class="flex justify-between items-center mb-2 p-2 bg-gray-100 rounded">
      <span>{todo.title}</span> <!-- TODOタイトルを表示 -->
      <button
        class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
        on:click={() => deleteTodo(index)}
      >
        削除
      </button>
    </div>
  {/each}
</div>

<style>
</style>
