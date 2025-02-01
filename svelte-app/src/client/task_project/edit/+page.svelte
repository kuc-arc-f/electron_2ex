<svelte:head>
<title>Show</title>
<meta name="description" content="About this app" />
</svelte:head>

<script lang="ts">
import { onMount } from 'svelte';
//import { marked } from 'marked';
//import LibConfig from '$lib/LibConfig';
//import LibAuth from '$lib/LibAuth';
//import LibCommon from '$lib/LibCommon';
//import HttpCommon from '$lib/HttpCommon';
import CrudEdit from "../CrudEdit";
import ApiUtil from '$lib/ApiUtil';
import ModalComplete from '$lib/components/ModalComplete.svelte';
//
/** @type {import('./$types').PageData} */
export let data: any, item: any= {}, post_id = 0, content = "", id = 0;
let task: any = {};
let messageModal = ""
//id = data.id;
//
//console.log("[id=", data.id);
//console.log(data.item);

onMount(async () => {
  try {
    const searchParams = new URLSearchParams(window.location.search);
    const idValue = searchParams.get('id') || "";
    console.log("onMount=", idValue);
    id = Number(idValue);

    let postItem: any = {
      "id": idValue
    }; 
    console.log("onMount", idValue);
    return;
    //const res = await ApiUtil.post('/project/get', postItem );
    //console.log(res)
    //return res.data;
    //ApiUtil
    /* 
    const json = await HttpCommon.server_post(postItem, "/project/get");
console.log(json);
    return {
        id: params.id,
        item: json.data,
    };
    */
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
const startProc= async function() {
}
//startProc();
/**
 * deleteItem
 * @param
 *
 * @return
 */ 
const save = async function() {
    try{
console.log("#save="); 
        const resulte = await CrudEdit.update(Number(id));
console.log(resulte);
        if(resulte) {
//            alert("Success, save");
            messageModal = "Success, Save";
			MicroModal.show('modal-1');
        }
    } catch (e) {
        console.error(e);
        throw new Error('Error , save');
    }    
}

/**
 * deleteItem
 * @param
 *
 * @return
 */ 
 async function deleteItem(){
	try {
		const item = {
			id: Number(data.id),
		}
//console.log(item);
        const resulte = await CrudEdit.delete(Number(data.id));
console.log(resulte);
        if(!resulte) {
            throw new Error("Error, delete");
        } else {
//            alert("Success, delete");
            messageModal = "Success, delete";
            MicroModal.show('modal-1')
        }
	} catch (error) {
	    console.error(error);
	}
}
//
const okFunction = function () {
    window.location.href = `/task_project`;
}
</script>

<!-- CSS -->
<style>
</style>

<!-- MarkUp -->
<div class="container my-2">
    <a class="btn btn-outline-primary" href={`/task_project`}
    >Back</a>
    <h1>title</h1>
    ID: 0
    <hr />
	<div class="col-md-6 form-group">
		<label for="name">Name</label>
		<input type="text" id="name" name="name" value={0}
		class="form-control" required>
	</div>
    <hr class="my-1" />  
    <button on:click={save} class="btn btn-primary my-2">Save</button>  
    <hr class="my-1" />
    <button on:click={deleteItem} class="btn btn-danger my-2">Delete</button>    
    <hr />
    <!--
    <ModalComplete bind:message={messageModal} okFunction={okFunction} />
    -->
</div>

<!--
<hr class="my-1" />
-->
