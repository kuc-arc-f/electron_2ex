<svelte:head>
<title>Show</title>
<meta name="description" content="About this app" />
</svelte:head>

<script lang="ts">
import {location, querystring} from 'svelte-spa-router';
import {link, push } from 'svelte-spa-router';
import { onMount } from 'svelte';
//import LibConfig from '$lib/LibConfig';
//import LibAuth from '$lib/LibAuth';
import LibCommon from '../../lib/LibCommon';
import ApiUtil from '../../lib/ApiUtil';
import CrudEdit from "./CrudEdit";

/** @type {import('./$types').PageData} */
export let data: any, item: any= {}, post_id = 0, content = "", id = 0;
let task: any = {}, project = {};
let selected = 1;
let messageModal = ""

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
  const res = await CrudEdit.get(Number(id));
  console.log(res.data);
  task = res.data;
  console.log(task);
  console.log("projectId=", task.projectId);
  selected = Number(task.status);
  task.complete = LibCommon.converDateString(task.complete);
  task.start_date = LibCommon.converDateString(task.start_date);
}

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
const save = async function() {
  try{
console.log("#save.selected=", selected); 
    const resulte = await CrudEdit.update(Number(id), selected);
console.log(resulte);
    if(resulte) {
      //location.href = `/task_project_show?id=${task.projectId}`;
      push(`/task_project_show?id=${task.projectId}`);
    }
  } catch (e) {
    console.error(e);
    throw new Error('Error , save');
  }    
}

/**
 *
 * @param
 *
 * @return
 */ 
 async function deleteItem(){
	try {
    if (!window.confirm("Delete OK?")) {
      return;
    }

		const item = {
			id: Number(id),
		}
console.log(item);
    const res = await ApiUtil.post('/tasks/delete', item );
    console.log("ret=", res.ret)
    console.log(res)
    if(!res.ret){
      throw new Error("Error, delete");
    }else{
      //location.href = `/task_project_show?id=${task.projectId}`;
      push(`/task_project_show?id=${task.projectId}`);
    }
    return res.data;
	} catch (error) {
	    console.error(error);
	}
}
</script>

<!-- CSS -->
<style>
</style>

<!-- MarkUp -->
<div class="min-h-screen flex items-center justify-center bg-gray-100">
	<div class="bg-white p-8 rounded shadow-md w-full max-w-sm">
    <a class="btn btn-outline-blue" href={`/task_project_show?id=${task.projectId}`}
    use:link
    >Back</a>
    <h1 class="text-3xl">{task.title}</h1>
    ID: {id}
    <hr />
    <div class="col-md-9 form-group">
      <label class="fw-bold ">Title:</label>
      <input type="text" name="title" id="title" 
      class="input_text"
      value={task.title} />
    </div>
    <label>
        <input bind:group={selected} type="radio" name="amount" value={1} 
        class="form-check-input mx-2" />none
    </label>
    <label>
        <input bind:group={selected} type="radio" name="amount" value={2} 
        class="form-check-input mx-2" />working
    </label>
    <label>
        <input bind:group={selected} type="radio" name="amount" value={3} 
        class="form-check-input mx-2" />complete
    </label>
    <hr class="mt-2 mb-2" />
    <div class="col-md-6 form-group">
        <label class="col-sm-12">start:</label>
        <input type="date"  class="input_text"  id="start_date" name="start_date"                   
        value={task.start_date} required="required" />        
    </div>    
    <hr class="mt-2 mb-2" />
    <div class="col-md-6 form-group">
        <label class="col-sm-12">End:</label>
        <input type="date"  class="input_text"  id="complete" name="complete"                   
        value={task.complete} required="required" />        
    </div>
    <hr />
    <div class="col-md-12 form-group">
        <label for="content">Content</label>
        <textarea id="content" name="content" required 
        class="input_textarea"
        rows="10" placeholder="">{task.content}</textarea>
    </div>
    <button on:click={save} class="btn btn-primary my-2">Save</button>  
    <hr class="my-1" />
    <button on:click={deleteItem} 
    class="btn btn-outline-red my-2">Delete</button>    

  </div>
</div>   

<!--
-->
