//import LibDbSession from '$lib/LibDbSession';
//import LibConfig from '$lib/LibConfig';
import LibCookie from './LibCookie';
//
const LibAuth = {
  /**
   * validLogin:
   * @param key: any
   *
   * @return
   */ 
  validLogin: async function(): Promise<any>
  {
    try {
      /*
      let ret = false;
      const user = await LibDbSession.get(LibConfig.SESSION_KEY_USER);
console.log(user);
      if(user === null) {
        return ret;
      }
      ret = true;
      return ret;
      */
    } catch (e) {
      console.error(e);
    }
  },
  /**
   *
   * @param
   *
   * @return
   */
  getUserId: function(): any
  {
    try {
      let ret = null;
      return 1;
    } catch (e) {
      console.error(e);
    }
  },  
}
export default LibAuth;
