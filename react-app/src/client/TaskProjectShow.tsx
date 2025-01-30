import React from "react";
import {useState, useEffect}  from 'react';
import { Link } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { z } from 'zod';
import moment from "moment";
import ApiUtil from '../lib/ApiUtil';
import CrudIndex from './TaskProject/CrudIndex';
import TaskIndex from "./TaskItems/CrudIndex";
import TaskCrud from './TaskItems/Crud';

let data: any ={items: []}
let project = {};
let items = [];
let itemsNone = [], itemsWorking = [], itemsComplete = [];

export default function Page (){
  const [searchParams] = useSearchParams();
  const [updateTime, setUpdateTime] = useState("");
  const [id, setId] = useState(0);
  //const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const tmpId = searchParams.get('id'); // ?xx=の値を取得
        setId(tmpId);
        console.log("tmpId=", tmpId);
        const res = await TaskIndex.getList(tmpId);
        console.log(res.data);
        items = res.data;
        setStateArray();
        //project
        const target = await CrudIndex.get(tmpId);
        project = target.data;
        //console.log(target.data);

        setUpdateTime(new Date().getTime());
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };
    fetchTodos();
  }, []);

  const setStateArray = async function() {
    itemsNone = items.filter(item => (item.status === String(TaskCrud.statusType.none)) );
//    console.log(itemsNone);
    itemsWorking = items.filter(item => (item.status === String(TaskCrud.statusType.working)) );
//    console.log(itemsWorking);
    itemsComplete = items.filter(item => (item.status === String(TaskCrud.statusType.complete)) );
//    console.log(itemsComplete);
  }

  const clearSearch = async function() {
    const seachKey = document.querySelector("#searchKey") as HTMLInputElement;
    seachKey.value = "";
  }

  return (
  <div className="bg-gray-100">
    <div className="pt-2">
      <Link to={`/`} className="btn-outline-blue mx-2">home
      </Link>
    </div>
    <div className="container mx-auto px-4 py-4">
      <div className="row">
        <div className="col-md-6">
            <Link to={`/task_project`} className="btn btn-outline-blue">Back
            </Link>
        </div>
        <div className="col-md-6 text-end">
          <Link className="btn btn-primary mx-4" to={`/task_items/create?id=${id}`}
          >Create</Link>
        </div>
      </div>
      <div className="items-center justify-between mt-2 p-4 bg-white rounded-lg shadow">
        <div className="col-md-6">
          <h3 className="text-3xl font-bold">{project.name}</h3>
          ID: {project.id}
        </div>        
        <div className="row">
          <div className="col-md-6 text-end p-2">
            {/*
            <Link className="btn btn-outline-blue mx-0" 
            to={`/task_project_gantt?id=${id}`} >Gantt</Link>
            */}
            <Link className="btn btn-outline-blue mx-0" 
            to={`/task_project/export?id=${id}`} >Export</Link>
          </div>
        </div>
        <hr className="my-1" />
        <div className="text-end">
          <button className="btn btn-sm btn-outline-blue" 
          >Clear</button>
          <span className="search_key_wrap">
            <input type="text" size="24" 
            className="border border-gray-400 rounded-md px-3 py-2 w-[50%] focus:outline-none focus:border-blue-500" 
            name="searchKey" id="searchKey" 
            placeholder="Title search" />
          </span>
          <button className="btn btn-sm btn-outline-blue" >Search</button>      
        </div>
        
      </div>

      <div className="flex flex-row">
        <div className="flex-1 text-center p-1 m-1">
          <h3 className="text-2xl">None</h3>
        </div>
        <div className="flex-1 text-center p-1 m-1">
          <h3 className="text-2xl">Working</h3>
        </div>
        <div className="flex-1 text-center p-1 m-1">
          <h3 className="text-2xl">Complete</h3>
        </div>
      </div>

      <div className="flex flex-row">
        <div className="flex-1 text-center p-0 m-1">
        {itemsNone.map((item, index) => (
          <div key={index} 
          className="items-center justify-between py-4 px-4 my-4 bg-white rounded-lg shadow">
            <h3>{item.title}</h3>
            <Link to={`/task_items/edit?id=${item.id}`}>
              <span class="task_title mx-2">[Edit]</span>
            </Link>
            <span>id: {item.id}</span>
            <span> , end: {item.complete ? moment(item.complete).format("YYYY-MM-DD") : null}</span>

          </div>
        ))}
        </div>

        <div className="flex-1 text-center p-0 m-1">
        {itemsWorking.map((item, index) => (
          <div key={index} 
          className="items-center justify-between py-4 px-4 my-4 bg-white rounded-lg shadow">
            <h3>{item.title}</h3>
            <Link to={`/task_items/edit?id=${item.id}`}>
              <span class="task_title mx-2">[Edit]</span>
            </Link>
            <span>id: {item.id}</span>
            <span> , end: {item.complete ? moment(item.complete).format("YYYY-MM-DD") : null}</span>
          </div>
        ))}
        </div>

        <div className="flex-1 text-center p-0 m-1">
        {itemsComplete.map((item, index) => (
          <div key={index} 
          className="items-center justify-between py-4 px-4 my-4 bg-white rounded-lg shadow">
            <h3>{item.title}</h3>
            <Link to={`/task_items/edit?id=${item.id}`}>
              <span class="task_title mx-2">[Edit]</span>
            </Link>
            <span>id: {item.id}</span>
            <span> , end: {item.complete ? moment(item.complete).format("YYYY-MM-DD") : null}</span>
          </div>
        ))}
        </div>

      </div>

      <hr />


    </div>

  </div>
  );
}