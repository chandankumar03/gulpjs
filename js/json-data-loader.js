/* 
This file is download through webworker and it will be 
responsible to get the data from server and return 
the data to the main application 
*/

(function (){
var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://warpspeed.pepperfry.com/var/fs/bulkupload/download/category_brand.json',true);
xhr.setRequestHeader('Content-Type', 'application/json'); 
xhr.send(null);
xhr.onreadystatechange = function() {
  /* postMessage 0 means error */
  
    if (xhr.readyState === 4) {
      /* isJSON, this will store json format is ok or not, default status is true */
      
      var isJSON= true
        if (xhr.status === 200) {
          /* If received 200 status from server */
          
              try{
                /* Is the json file recevied from the server is proper and not broken */
                
                JSON.parse(xhr.responseText)
              }catch(e){
                /* if broken post message to the main application that its fail to get the data from server */
                /* 
                if json is broken isJSON =false means the file is not in a good condition */
                
                postMessage(0);
                isJSON = false
              }
              if(isJSON){
                /* if json can be parsed successfully we will send a postMessage with the json  */
                
                postMessage(xhr.responseText);
              }
        }else {
          /* if not 200 status postMessage with error  */
          
           postMessage(0);
      }
    } 
}
})()