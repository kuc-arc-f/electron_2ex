<script lang="ts">
import {location, querystring} from 'svelte-spa-router';
import {link} from 'svelte-spa-router';
import { onMount } from 'svelte';
import TaskIndex from "../task_items/CrudIndex";
import LibConfig from '../../lib/LibConfig';
import ApiUtil from '../../lib/ApiUtil';
//import CrudShow from '../CrudShow';
import ExportList from './export/ExportList';
import ExportGantt from './export/ExportGantt';
//
/** @type {import('./$types').PageData} */
export let data: any, item: any= {}, post_id = 0, content = "", id = 0;
let items: any[] = [], itemsNone = [], itemsWorking = [], itemsComplete = [];
let project = {};

/**
*
* @param
*
* @return
*/
const startProc= async function() {
  const idValue = $querystring.replace("id=", '');
  console.log("idValue=", idValue);
  id = Number(idValue);
  const target = await TaskIndex.getList(id);
  items = target.data;
  let postItem: any = {
    "id": id
  }; 
  const res = await ApiUtil.post('/project/get', postItem );
  project = res.data.data;
  console.log(project)
  setStateArray();
  //console.log(items);
}

onMount(async () => {
  try {
    startProc();
  } catch (e) {
    console.log(e);
  }
});
//
const setStateArray = async function() {
    itemsNone = items.filter(item => (item.status === '1') );
//    console.log(itemsNone);
    itemsWorking = items.filter(item => (item.status === '2') );
//    console.log(itemsWorking);
    itemsComplete = items.filter(item => (item.status === '3') );
//    console.log(itemsComplete);
}
/**
*
* @param
*
* @return
*/
const exportExcel = async function () {
//console.log("#exportExcel");
  try{
    const taskData = {
        itemsNone: itemsNone,
        itemsWorking: itemsWorking,
        itemsComplete: itemsComplete,
    };
    const filePath = 'static/task_temp.xlsx';
    const data = await window.myGetTemplateFile.getTemplateFile(filePath);
    await ExportList.exportXlsx(taskData, data);
  } catch (e) {
    console.error(e);
    throw new Error('Error , exportExcel');
  }

}

const exportGantt = async function () {
  try{
    const filePath = 'static/Gantt_temp.xlsx';
      const data = await window.myGetTemplateFile.getTemplateFile(filePath);
      //console.log(data);
      await ExportGantt.out(items, data)
  } catch (e) {
      console.error(e);
      throw new Error('Error , exportGantt');
  }
}
</script>

<!-- CSS -->
<style>
</style>

<!-- MarkUp -->
<div class="container my-2">
    <div class="row">
        <div class="col-md-6">
            <a href={`/task_project`} class="btn-outline-blue"
            use:link>Back
            </a>
        </div>
        <div class="col-md-6 text-end">
        </div>
    </div>
    <hr class="my-1" />
    <h1>Export: {project.name}</h1>
    ID: {id}
    <hr class="my-1" />
    <div class="text-center">
      <button class="my-2 btn btn-primary" on:click={exportExcel}>List</button>
    </div>    
    <hr class="my-1" />
    <div class="text-center">
        <button class="my-2 btn btn-primary" on:click={exportGantt}
        >Gantt</button>
    </div>    
    <hr class="my-1" />

</div>

<!--
-->
