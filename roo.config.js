const path=require('path')
module.exports={
  bid:{
    helpers:{
      "test"(){
        return '长卿无敌帅'
      }
    },
    page: {
      output:path.join(__dirname,'src/pages'),
      templates:[
        {
          name:'PageSample',
          src:path.join(__dirname,'templates/pages/PageSample'),
          prompts:[]
        },
        {
          name:'PageReducer',
          src:path.join(__dirname,'templates/pages/PageReducer'),
          prompts:[]
        }
      ]
    },
    component:{
      output:path.join(__dirname,'src/components'),
      templates:[
        {
          name:'ComSample',
          src:path.join(__dirname,'templates/components/ComSample'),
          prompts:[]
        }
      ]
    }
  }
}
