let API_BASE = "";

const ApiUtil = {

  post: async function(path: string, item: any): Promise<any>
  {
    const retObj = {ret: 500, data: {}}
    try{
      const url = API_BASE + path;
      //item.api_key = ""
      console.log("url=", url);
      const res = await window.myPostExternelApi.postExternelApi(url, item);
      //console.log(res);
      return res;
    }catch(e){
      console.error(e);
      throw new Error('Error, post')
    }
  },

};
export default ApiUtil;