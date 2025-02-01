//import LibCrud from '../../lib/LibCrud';
//import LibConfig from '$lib/LibConfig';
//import HttpCommon from '$lib/HttpCommon';
import ApiUtil from '../../lib/ApiUtil';
//
const CrudShow = {
  /**
  *
  * @param
  *
  * @return
  */  
  search :async function (id: number): Promise<any>
  {
    try{
      const seachKey = (<HTMLInputElement>document.querySelector("#searchKey")).value;
      const postItem = {
        projectId: id, 
        seachKey: seachKey,
      }
//console.log(postItem); 
      const res = await ApiUtil.post('/tasks/search', postItem);
      console.log(res.data)
      return res.data;
    } catch (e) {
      console.error(e);
      throw new Error("Error, search");
    } 
  },  
  /**
  *
  * @param
  *
  * @return
  */   
  startProc :async function (): Promise<void> 
  {
    try{
      console.log("#startProc");
      //
      const button: any = document.querySelector('#status_complete');
      button.addEventListener('click', async () => {
        console.log("#status_complete");
      });      
    } catch (e) {
      console.error(e);
    }    
  } 
}
//
//CrudIndex.startProc();

export default CrudShow;
