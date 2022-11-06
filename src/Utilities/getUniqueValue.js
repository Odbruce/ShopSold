import { arrange } from "./arrange";

export const getUniqueValue = (data,prop,type) => {

  const Array = (data.map((item)=>{
    
    return item[prop] ;

  }))

  let UniqueArray = new Set(Array.flat());

  if(prop==="size"){
    UniqueArray = arrange(UniqueArray, "size");
  }
  if(type){
    return [...UniqueArray]
  }

  return ["all", ...UniqueArray];
}

