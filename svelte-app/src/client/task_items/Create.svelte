<svelte:head>
<title>Show</title>
<meta name="description" content="About this app" />
</svelte:head>

<script lang="ts">
import {location, querystring} from 'svelte-spa-router';
import {link, push} from 'svelte-spa-router';
let selected = 1;
import { z } from "zod";
import { onMount } from 'svelte';
//import LibConfig from '$lib/LibConfig';
import LibCommon from '../../lib/LibCommon';
import CrudCreate from "./CrudCreate";
import Crud from './Crud';
import { todoSchema } from './create/types';

/** @type {import('./$types').PageData} */
export let data: any, item: any= {}, post_id = 0, content = "", id = 0;
let messageModal = "";
let complete = "", start_date= "";
let errors: { [key: string]: string } = {};
//
const startProc= async function() {
  const dt = LibCommon.formatDate(new Date(), 'YYYY-MM-DD');
  complete = dt;
  start_date = dt;
//console.log(complete);
}
onMount(async () => {
  try {
    const idValue = $querystring.replace("id=", '');
    console.log("idValue=", idValue);
    id = Number(idValue);
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
    errors = {};
    let values = Crud.getInputValues();
console.log(values); 
    const validatedTodo = todoSchema.parse(values);
console.log("#save.selected=", selected); 
    const resulte = await CrudCreate.addItem(Number(id), selected);
console.log(resulte);
    if(resulte.ret === 200) {
      //location.href = `/task_project_show?id=${id}`;
      push(`/task_project_show?id=${id}`);
    }
  } catch (error) {
    console.error(error);
    if (error instanceof z.ZodError) {
			errors = error.errors.reduce((acc, curr) => {
				const field = curr.path[0];
				acc[field] = curr.message;
				return acc;
			}, {});
		}
    console.log(errors);
  }    
}
</script>

<!-- CSS -->
<style>
</style>

<!-- MarkUp -->
<div class="min-h-screen flex items-center justify-center bg-gray-100">
	<div class="bg-white p-8 rounded shadow-md w-full max-w-sm">
    <a class="btn-outline-blue" href={`/task_project_show?id=${id}`}
    use:link
    >Back</a>
    <hr class="my-2" />
    <h1 class="text-3xl -font-bold">TaskCreate</h1>
    projectId: {id}
    <hr class="my-2" />
    <div class="col-md-9 form-group">
      <label class="fw-bold ">Title:</label>
      <input type="text" name="title" id="title" 
      class="input_text" />
      {#if errors.title}
			<p class="text-red-500 text-sm mt-1">{errors.title}</p>
			{/if}
    </div>
    <hr class="my-2" />
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
        <label class="col-sm-12">Start:</label>
        <input type="date"  class="input_text"  id="start_date" name="start_date"                   
        value={start_date} required="required" />        
    </div>
    <hr class="mt-2 mb-2" />
    <div class="col-md-6 form-group">
        <label class="col-sm-12">End:</label>
        <input type="date"  class="input_text"  id="complete" name="complete"                   
        value={complete} required="required" />        
    </div>
    <hr />
    <div class="col-md-6 form-group">
        <label for="content">Content:</label>
        <textarea id="content" name="content" required 
        class="input_textarea"
        rows="10" placeholder=""></textarea>
    </div> 
    <button on:click={save} class="btn btn-primary my-2">Save</button>
  </div>
</div>

<!--
-->
