import { model } from "mongoose";

import { encrypt, decrypt } from './ccavutil';

export const postReq = function(request: any,response: any){
    try {
        console.log(typeof request)
    var body = '',
	workingKey = 'E4F89F86C5ADDA6C7F38D6E7103436BC',	//Put in the 32-Bit Key provided by CCAvenue.
	accessCode = 'AVKE83GB75CH25EKHC',			//Put in the Access Code provided by CCAvenue.
	encRequest = '',
	formbody = '';

    const req = JSON.stringify(request.body)
    const combinedData = `${String(workingKey)}|${(req)}`;
	// body += req;
	encRequest = btoa(String(combinedData)); 
    console.log(encRequest)
	formbody = '<form id="nonseamless" method="post" name="redirect" action="https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction"/> <input type="hidden" id="encRequest" name="encRequest" value="' + encRequest + '"><input type="hidden" name="access_code" id="access_code" value="' + accessCode + '"><script language="javascript">document.redirect.submit();</script></form>';
				
        console.log('end')
        response.writeHeader(200, {"Content-Type": "text/html"});
        response.write(formbody, () => console.log('writing'));
        console.log('response', response)
	response.end();
   return; 
    } catch (err) {
        console.log(err)
    }
};
