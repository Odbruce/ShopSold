const Airtable = require('airtable-node');
require("dotenv").config()



exports.handler = async (event)=>{
    
    let tables = event.queryStringParameters.cate==="men" ?"men":"women";

    console.log(event.queryStringParameters.cate);
    
    const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
      .base('appcraBS6DJKAua0l')
      .table(tables)


       const {id} = event.queryStringParameters
       if(id){
           try {
               const product = await airtable.retrieve(id)

               if(product.error){
                   return (
                       {
                           statusCode:404,
                           body:"omo! no product matching your description found"
                       }
                   )
               }

            const {images,ratings,price,stock,category,color,products:name} = product.fields;
            const pictures = images.map((image)=>{
                const {id,url} = image;
                return {id,url};
            })

            return (
                {
                    statusCode:200,
                    body:JSON.stringify({name,type:category[0],pictures,ratings,price,stock,color})
                }
            )
           } catch (error) {
            return (
                {
                    statusCode:500,
                    body:"SERVER ERROR, PLEASE CHECK YOUR CONNECTION"
                }
            )
           }
       }
       
    try{
        
        const {records} = await airtable.list({
        maxRecords: 2000,
        })
        console.log(records,"records")

        const products =    
            records.filter((product)=>{
                const {featured} = product.fields;
                return featured;
                }).map((item)=>{
                        const {category,images,featuredvideo} = item.fields;
                        const videoUrl = featuredvideo[0].url;
                        const featuredUrl = images[0].url;

                    let  values = records.filter((val)=>{
                                const {featuredvideo} = val.fields;
                                let ref = val.fields.category[0] ;
                                return category[0]===ref&!featuredvideo
                            }).map((item)=>{
                                const {id} = item;
                                const {products,images,category,ratings,price,color,stock,size} = item.fields;
                                const img = images.map((item)=>{
                                    return item.url;
                                })
                                const url= images[0].url
                                return {id,products,url,type:tables,cate:category[0],ratings,price,stock,color,images:img,size}
                            })
                                return {name:category[0],featuredUrl,videoUrl,values}
    })

    return (
      {
          statusCode:200,
          body:JSON.stringify(products)
      }
  )

  }
    
      catch(error){
        console.log(error,"error")
        return (
            {
                statusCode:500,
                body:"Omo an ERROR occured while loading, please check your connection "
            }
        )
      }
  
}