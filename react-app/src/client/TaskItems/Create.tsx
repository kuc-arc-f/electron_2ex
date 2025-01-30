import React from "react";
import {useState, useEffect}  from 'react';
import { Link } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { z } from 'zod';
import moment from "moment";
import ApiUtil from '../../lib/ApiUtil';
import ApiUtil from '../../lib/ApiUtil';
import Crud from './Crud';
import CrudCreate from './CrudCreate';
import { todoSchema } from './types';

let data: any ={items: []}
let project = {};
let items = [];
let itemsNone = [], itemsWorking = [], itemsComplete = [];
//let complete = "", start_date= "";

export default function Page (){
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [updateTime, setUpdateTime] = useState("");
  const [id, setId] = useState(0);
  const [selectedValue, setSelectedValue] = useState('1');
  const [startDate, setStartDate] = useState('');
  const [complete, setComplete] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const tmpId = searchParams.get('id'); // ?xx=の値を取得
        setId(tmpId);
        console.log("tmpId=", tmpId);
        const dt = moment().format('YYYY-MM-DD');
        setStartDate(dt);
        setComplete(dt);  
        setUpdateTime(new Date().getTime());
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };
    fetchTodos();
  }, []);

  // ラジオボタンの変更を処理する関数
  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const saveProc = async function() {
    try{
      setErrors({});
      let values = Crud.getInputValues();
  console.log(values); 
      const validatedTodo = todoSchema.parse(values);
  console.log("#save.selected=", selectedValue); 
      const resulte = await CrudCreate.addItem(Number(id), selectedValue);
  console.log(resulte);
      if(resulte.ret === 200) {
        navigate(`/task_project_show?id=${id}`);
      }
    } catch (error) {
      console.error(error);
      if (error instanceof z.ZodError) {
        const target = error.errors.reduce((acc, curr) => {
          const field = curr.path[0];
          acc[field] = curr.message;
          return acc;
        }, {});
        setErrors(target);
        console.log(target);
      }
    }    
  }

  return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
      <Link className="btn-outline-blue" to={`/task_project_show?id=${id}`}
      >Back</Link>
      <hr className="my-2" />
      <h1 className="text-3xl -font-bold">TaskCreate</h1>
      projectId: {id}
      <hr className="my-2" />
      <div className="col-md-9 form-group">
        <label className="fw-bold ">Title:</label>
        <input type="text" name="title" id="title" 
        className="input_text" />
        {errors.title ? (
          <p className="text-red-500 text-sm mt-1">{errors.title}</p>
        ) : null}
      </div>
      {/* status */}
      <div>
        <label>
          <input
            type="radio"
            value="1"
            checked={selectedValue === '1'}
            onChange={handleRadioChange}
            className="ms-2"
          />
          none
        </label>
        <label>
          <input
            type="radio"
            value="2"
            checked={selectedValue === '2'}
            onChange={handleRadioChange}
            className="ms-2"
          />
          working
        </label>
        <label>
          <input
            type="radio"
            value="3"
            checked={selectedValue === '3'}
            onChange={handleRadioChange}
            className="ms-2"
          />
          complete
        </label>

      </div>
      <hr className="mt-2 mb-2" />
      <div className="col-md-6 form-group">
        <label clasclassNames="col-sm-12">Start:</label>
        <input type="date"  className="input_text"  id="start_date" name="start_date"                   
        value={startDate} required="required"
        onChange={(e) => setStartDate(e.target.value)} />        
      </div>
      <div className="col-md-6 form-group">
        <label className="col-sm-12">End:</label>
        <input type="date"  className="input_text"  id="complete" name="complete"                   
        value={complete} required="required"
        onChange={(e) => setComplete(e.target.value)} />        
      </div>
      <div className="col-md-6 form-group">
        <label for="content">Content:</label>
        <textarea id="content" name="content" required 
        className="input_textarea"
        rows="10" placeholder=""></textarea>
      </div>       
      <button  
      onClick={() => saveProc()}
      className="btn btn-primary my-2">Save</button>

    </div>

  </div>
  );
}

