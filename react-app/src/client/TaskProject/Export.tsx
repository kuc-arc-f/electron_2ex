import React from "react";
import {useState, useEffect}  from 'react';
import { Link } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { z } from 'zod';
import ApiUtil from '../../lib/ApiUtil';
import CrudIndex from './CrudIndex';
import TaskIndex from "../TaskItems/CrudIndex";
import TaskCrud from '../TaskItems/Crud';
import ExportGantt from './ExportGantt';
import ExportList from './ExportList';

let data: any ={items: []}
let project = {};
let items = [];
let itemsNone = [], itemsWorking = [], itemsComplete = [];

export default function Page (){
  const [searchParams] = useSearchParams();
  const [updateTime, setUpdateTime] = useState("");
  const [id, setId] = useState(0);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const tmpId = searchParams.get('id'); // ?xx=の値を取得
        setId(tmpId);
        console.log("tmpId=", tmpId);
        const res = await TaskIndex.getList(tmpId);
        console.log(res.data);
        items = res.data;
        const resProj = await ApiUtil.post('/project/get', {"id": tmpId} );
        project = resProj.data.data;
        console.log(project)

        //console.log("apiUrl=", API_URL)
        //const res = await ApiUtil.post('/project/get_list', {});
        //console.log(res.data);
        //data.items = res.data.data;
        setStateArray();
        setUpdateTime(new Date().getTime());
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };
    fetchTodos();
  }, []);

  const setStateArray = async function() {
    itemsNone = items.filter(item => (item.status === '1') );
//    console.log(itemsNone);
    itemsWorking = items.filter(item => (item.status === '2') );
//    console.log(itemsWorking);
    itemsComplete = items.filter(item => (item.status === '3') );
//    console.log(itemsComplete);
  }

  const clearSearch = async function() {
    const seachKey = document.querySelector("#searchKey") as HTMLInputElement;
    seachKey.value = "";
//console.log(items);
  }

  const exportExcel = async function () {
    try{
      const filePath = 'static/task_temp.xlsx';
      const data = await window.myGetTemplateFile.getTemplateFile(filePath);

      const taskData = {
        itemsNone: itemsNone,
        itemsWorking: itemsWorking,
        itemsComplete: itemsComplete,
     };
      //console.log(taskData);
      await ExportList.exportXlsx(taskData, data)
    } catch (e) {
        console.error(e);
        throw new Error('Error , exportExcel');
    }
  }

  const exportGantt = async function () {
    try{
      //await ExportGantt.out(items);
      const filePath = 'static/Gantt_temp.xlsx';
      const data = await window.myGetTemplateFile.getTemplateFile(filePath);
      await ExportGantt.out(items, data)

    } catch (e) {
        console.error(e);
        throw new Error('Error , exportGantt');
    }
  }

  return (
  <>
    <div className="container mx-auto px-4 py-4 bg-gray-100">
      <div className="pt-2">
        <Link to={`/`} className="btn-outline-blue mx-2">home
        </Link>
      </div>
      <hr className="my-2" />
      <div className="col-md-6">
          <Link to={`/task_project`} className="btn btn-outline-blue mx-2">Back
          </Link>
      </div>
      <hr className="my-2" />
      <h1 className="text-3xl">Export: {project.name}</h1>
      ID: {id}
      <hr className="my-2" />
      <div class="text-center">
          <button class="my-2 btn btn-primary" onClick={() => {exportExcel()}}>List</button>
      </div>    
      <hr class="my-1" />
      <div className="text-center">
        <button className="my-2 btn" onClick={() => exportGantt()}
        >Gantt</button>
      </div>    
      <hr className="my-1" />

    </div>

  </>
  );
}