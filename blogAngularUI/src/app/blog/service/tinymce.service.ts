import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TinymceService {

  constructor() { }


  getSettings(){
    return{
      height:500,
      menbar:false,

      plugins:'textcolor colorpicker advlist autolink link lists charmap code print preview fullscreen paste image imagetools',

      toolbar: `forecolor backcolor | bold italic underline strikethrough subscript superscript charmap | formatselect fontselect fontsizeselect | bullist numlist | alignleft aligncenter alignright | outdent indent | link unlink openlink image | code preview fullscreen`,

      images_upload_url:`${environment.apiUrlBase}/postimages`,
      images_upload_crededtials:false,
      automatic_upload:true,
      imagetools_toolbar:'rotateleft rotateright | flipv fliph |editimage imageoptions',
      paste_data_images:true,
      paste_postprocess:function(plugin,args){
        console.log(plugin);
        console.log(args);
        console.log(args.node);

      }
    };
  }
}
