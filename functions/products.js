const Airtable = require('airtable-node');
require("dotenv").config()



exports.handler = async (event,context)=>{
    
    // let tables = event.queryStringParameters.cate==="\"men\""?"men":"projects";
    let tables = event.queryStringParameters.cate==="men" ?"men":"projects";

    console.log(event.queryStringParameters.cate);
    
    const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
      .base('appcraBS6DJKAua0l')
      .table(tables)


       const {id} = event.queryStringParameters
       if(id){
           try {

            const product = await airtable.retrieve(id)

            const {images,ratings,price,stock,category,color,products:name} = product.fields;
            const pictures = images.map((image)=>{
                const {id,url} = image;
                return {id,url};
            })

            if(product.error){
                return (
                    {
                        statusCode:404,
                        body:"ERR_NO_PRODUCT_FOUND"
                    }
                )
            }
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
                    body:"SOMETHING_WENT_WRONG"
                }
            )
           }
       }
       
    try{
        
   
    //   console.log("yes",event.queryStringParameters.id);
   
    //   const data = event.queryStringParameters.id
    //   const records= await airtable.retrieve(data);
    // const getRecord =()=>{  
        
    //     if(event.queryStringParameters.id){
    //         return records;
    //     };
    //     return records}
 
    
        const {records} = await airtable.list({
        maxRecords: 2000,
        })
        // console.log(records);

        // const record = getRecord();
    // const products = records.map((product)=>{
    //     const {category} = product.fields
    // const cate = category[0]
    //       return cate})  
    //    const items = Array.from(new Set(products))

    //   const view = items.map((item)=>{
    //      let  values = records.filter((val)=>{
    //         let ref = val.fields.category[0] ;
    //         return item===ref
    //      }).map((item)=>{
    //          const {id} = item;
    //          const {[0]:category,ratings} = item.fields;
    //          return {id,ratings,category}
    //      })
    //          return {name:item,values}
    //    })


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
                     const {products,images,category,price} = item.fields;
                     const url= images[0].url
                     return {id,products,url,price,images}
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
        return (
            {
                statusCode:500,
                body:"Server Error"
            }
        )
      }
  
}