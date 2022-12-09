


export const getUniqueValue = (data,prop,type) => {

  const arrange = (arr1,type) => {
    let arranged = [];
    for (let item of arr1) {
      if (item === "s") {
        arranged[0] = item;
      }
      if (item === "m") {
        arranged[1] = item;
      }
      if (item === "l") {
        arranged[2] = item;
      }
      if (item === "xl") {
        arranged[3] = item;
      }
    }
    if(type){
      return arranged
    }
    return["all",...arranged];
  };

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

