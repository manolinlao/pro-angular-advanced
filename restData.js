module.exports = function (){
  var data = {
    products:[
      {id:1,name:'kayak',category:'watersports',price:275,details:{supplier:'acme',keywords:['boat','small']}},
      {id:2,name:'lifejacket',category:'watersports',price:48.95,details:{supplier:'smoot co',keywords:['safety']}},
      {id:3,name:'soccer ball',category:'soccer',price:19.50},
      {id:4,name:'corner flags',category:'soccer',price:34.95},
      {id:5,name:'stadium',category:'soccer',price:79500},
      {id:6,name:'thinking cap',category:'chess',price:16},
      {id:7,name:'unsteady chair',category:'chess',price:29.95},
      {id:8,name:'human chess board',category:'chess',price:75},
      {id:9,name:'bling bling king',category:'chess',price:1200}
    ]
  }
  return data;
}