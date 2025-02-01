<script lang="ts">
import {location, querystring} from 'svelte-spa-router';
import {link} from 'svelte-spa-router';
import { onMount } from 'svelte';
import TaskIndex from "./task_items/CrudIndex";
import IndexRow from "./task_project_show/IndexRow.svelte";
//export let id;
//import LibConfig from '$lib/LibConfig';
//import LibCommon from '$lib/LibCommon';
import CrudShow from './task_project/CrudShow';
import CrudIndex from './task_project/CrudIndex';
import TaskCrud from './task_items/Crud';

/** @type {import('./$types').PageData} */
export let data: any, item: any= {}, post_id = 0, content = "", id = 0;
let items: any[] = [], itemsNone = [], itemsWorking = [], itemsComplete = [];
let project = {};
  
const setStateArray = async function() {
    itemsNone = items.filter(item => (item.status === String(TaskCrud.statusType.none)) );
//    console.log(itemsNone);
    itemsWorking = items.filter(item => (item.status === String(TaskCrud.statusType.working)) );
//    console.log(itemsWorking);
    itemsComplete = items.filter(item => (item.status === String(TaskCrud.statusType.complete)) );
//    console.log(itemsComplete);
}
const startProc= async function() {
  const idValue = $querystring.replace("id=", '');
  console.log("idValue=", idValue);
  id = Number(idValue);
  const res = await TaskIndex.getList(id);
  items = res.data;
  //console.log(items);
  setStateArray();
  const target = await CrudIndex.get(id);
  project = target.data;
  //console.log(project);
}
  
/**
*
* @param
*
* @return
*/
onMount(async () => {
  try {
    startProc();
  } catch (e) {
    console.log(e);
  }
});

/**
*
* @param
*
* @return
*/
const clearSearch = async function() {
    const seachKey = document.querySelector("#searchKey") as HTMLInputElement;
    seachKey.value = "";
    startProc();
console.log(items);
}

/**
*
* @param
*
* @return
*/
const search = async function() {
    console.log("search");
    const res = await CrudShow.search(Number(id));
//console.log(res);
    items = res.data;
    setStateArray();
}
//
const nextPage = function(path: string) {
    location.href = path;
}
/**
*
* @param
*
* @return
*/ 
const parentShowFunction = function (id: number) {
console.log("parentShowFunction=", id);
  //itemId.update(n => 0);
  //itemId.update(n => id);
}
</script>

<!-- CSS -->
<style>
</style>

<!-- MarkUp -->
<div class="container mx-auto px-4 py-4">
  <div class="row">
    <div class="col-md-6">
        <a href={`/task_project`} use:link 
        class="btn btn-outline-blue">Back
        </a>
    </div>
    <div class="col-md-6 text-end">
      <a class="btn btn-primary mx-4" 
      use:link
      href={`/task_items/create?id=${id}`}>Create</a>
    </div>
  </div>
  <div class="items-center justify-between mt-2 p-4 bg-white rounded-lg shadow">
    <div class="col-md-6">
      <h3 class="text-3xl font-bold">{project.name}</h3>
      ID: {project.id}
    </div>
    <div class="row">
      <div class="col-md-6 text-end p-2">
        <!--
        <a class="btn btn-outline-blue mx-0" 
        href="#" on:click={nextPage(`/task_project_gantt?id=${id}`)}>Gantt</a>
        -->
        <a class="btn btn-outline-blue mx-0" 
        use:link
        href={`/task_project/export?id=${id}`} >Export</a>
      </div>
    </div>

    <hr class="my-1" />
    <div class="row">
      <div class="text-end">
        <button class="btn btn-sm btn-outline-blue" on:click={clearSearch}
        >Clear</button>
        <span class="search_key_wrap">
          <input type="text" size="24" 
          class="border border-gray-400 rounded-md px-3 py-2 w-[50%] focus:outline-none focus:border-blue-500" 
          name="searchKey" id="searchKey" 
            placeholder="Title search">
        </span>
        <button class="btn btn-sm btn-outline-blue" on:click={search}>Search</button>      
      </div>
    </div>    
  </div>
  
  <div class="row">
  </div> 
  <!-- Task -->
  <div class="row">	 
    <div class="flex flex-row">
      <div class="flex-1 text-center p-0 m-1">
        {#each itemsNone as item}
            <IndexRow id={item.id} title={item.title} status="1" date={item.complete} 
            parentShowFunction={parentShowFunction} />
        {/each}

      </div>
      <div class="flex-1 text-center p-0 m-1">
        {#each itemsWorking as item}
            <IndexRow id={item.id} title={item.title} status="2" date={item.complete} 
            parentShowFunction={parentShowFunction} />
        {/each}
      </div>
      <div class="flex-1 text-center p-0 m-1">
        {#each itemsComplete as item}
            <IndexRow id={item.id} title={item.title} status="3" date={item.complete}
            parentShowFunction={parentShowFunction} />
        {/each}
      </div>
    </div>
  </div>

</div>
