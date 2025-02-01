
<script lang="ts">
import {link} from 'svelte-spa-router'
import { onMount } from 'svelte';
//import { goto } from '$app/navigation';
//import LibAuth from '$lib/LibAuth';
import ApiUtil from '../lib/ApiUtil';
import CrudIndex from './task_project/CrudIndex';

/** @type {import('./$types').PageData} */
export let data: any = {items: []};
console.log(data);
/**
 * start proc
 * @param
 *
 * @return
 */ 
 const startProc = async function () {
	try {
    const res = await ApiUtil.post('/project/get_list', {});
    console.log(res.data)
    data.items = res.data.data;
	} catch (e) {
    console.error(e);
  }	
}
//console.log("#start: /test");
startProc();
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
}
//
const nextPage = function(path: string) {
    location.href = path
}
/**
*
* @param
*
* @return
*/
const search = async function() {
    console.log("search");
    data.items = await CrudIndex.search();
//console.log(data.items);
}
</script>

<div class="task_project">
  <div class="pt-2">
    <a use:link href={`/`}
     class="btn-outline-blue mx-2">home
    </a>
  </div>
  <!-- main -->
  <div class="container mx-auto px-4 py-4">
    <div class="items-center justify-between p-4 bg-white rounded-lg shadow">
        <div class="col-md-6">
            <h1 class="text-3xl font-bold">project</h1></div>
        <div class="col-md-6 text-end">
            <a use:link href={`/task_project/create`} class="btn btn-primary">Create
            </a>
        </div>
        <hr class="my-1" />
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
    {#each data.items as item}
    <div class="flex items-center justify-between py-4 px-4 my-4 bg-white rounded-lg shadow">
      <div class="flex-1">
        <a use:link
        href={`/task_project_show?id=${item.id}`}>
          <h3 class="my-1">{item.name}</h3>
        </a>		
        <span>ID : {item.id}</span>
      </div>
      <div class="flex-1 text-end pt-3">
        <a href={`/task_project_show?id=${item.id}`} use:link
         class="btn btn-sm btn-outline-blue">Show
        </a>
        <!--
        <a class="btn btn-sm btn-outline-blue" use:link
        href={`/task_project/edit?id=${item.id}`}>Edit
        </a>
        <button on:click={nextPage(`/task_project_gantt?id=${item.id}`)}
          class="btn btn-sm btn-outline-blue">Gantt
        </button>
        -->
      </div>
      <hr class="my-2" />
    </div>
    {/each}	
  </div>

</div>