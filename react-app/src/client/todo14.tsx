import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { z } from 'zod';
import ApiUtil from '../lib/ApiUtil';
import Head from '../components/Head'

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        //console.log("apiUrl=", API_URL)
        const res = await ApiUtil.post(`/api/tauri_todo14_list`, {});
        console.log(res)
        setTodos(res.data.results);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };
    fetchTodos();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('/api/todos', { title, description });
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
  <>
    <Head />
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">TODO List</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}
          className="flex items-center justify-between border-b border-gray-300 py-2">
            {todo.title}
            <button 
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2"
            onClick={() => handleEdit(todo)}>編集</button>
            <button 
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
            onClick={() => handleDelete(todo)}>削除</button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="タイトル"
        />
        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="説明"
        />
        <button type="submit">追加</button>
      </form>
    </div>
  </>
  );
}

const handleEdit = async (todo) => {
  try {
    const response = await axios.put(`/api/todos/${todo._id}`, { title: todo.title, description: todo.description });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

const handleDelete = async (todo) => {
  try {
    await axios.delete(`/api/todos/${todo._id}`);
    console.log('TODO deleted');
  } catch (error) {
    console.error(error);
  }
};