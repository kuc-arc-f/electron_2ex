import React from "react";
import {useState, useEffect}  from 'react';
import { Link } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { z } from 'zod';
import ApiUtil from '../../lib/ApiUtil';
import {todoSchema} from './types';
import Crud from './Crud';

let data;
let errors: { [key: string]: string } = {};

export default function Page (){
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [updateTime, setUpdateTime] = useState("");

  const addPost = async function () {
    try{
      errors = {};
      const values = Crud.getInputValues();
      console.log(values);
      const validatedTodo = todoSchema.parse(values);
      const res = await ApiUtil.post('/project/create', values);
      console.log(res.data)
      navigate(`/task_project`);
    } catch (error) {
      console.log(error);
      if (error instanceof z.ZodError) {
        errors = error.errors.reduce((acc, curr) => {
          const field = curr.path[0];
          acc[field] = curr.message;
          return acc;
        }, {});
      }
      console.log(errors);
      alert("error, add");
    }
  }

  return (
  <>
    <div className="pt-2">
      <Link to={`/`} className="btn-outline-blue mx-2">home
      </Link>
    </div>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <div class="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <Link to={`/task_project`} class="btn-outline-blue">Back
        </Link>
        <hr class="my-2" />
        <h1 class="text-3xl font-bold">Project Create</h1>
        <hr class="my-2" />
        <div class="col-md-6 form-group">
          <label for="name">Name</label>
          <input type="text" id="name" name="name" 
          class="input_text" required />
        </div>
        <hr class="mt-2 mb-2" />
        <button onClick={() => addPost() } class="btn btn-primary my-2">Add</button>


      </div>
    </div>
  </>
  );
}
/*
      <div className="container mx-auto px-4 py-4">

      </div>
        <div className="items-center justify-between p-4 bg-white rounded-lg shadow">
          <div className="col-md-6">
            <h1 className="text-3xl font-bold">ProjectCreate</h1>
          </div>
        </div>

*/