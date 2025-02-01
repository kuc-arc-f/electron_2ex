/*
export const ssr = false;

import { error } from '@sveltejs/kit';
import LibConfig from '$lib/LibConfig';
import LibAuth from '$lib/LibAuth';
import HttpCommon from '$lib/HttpCommon';

type IPostItem = {
  id: number,
  title : string,
  content : string,
  category : string,
  createdAt: string,
}

export async function load({ params}) {
  try{
    console.log("id=", params.id);
    let postItem: any = {
      "id": params.id
    }; 
    const json = await HttpCommon.server_post(postItem, "/project/get");
    return {
        id: params.id,
        item: json.data,
    };  
  } catch (e) {
    console.error(e);
    throw new Error('Error , ');
  }
}
*/
