import React,{createContext, useContext,useEffect,useRef,useState,} from "react"
import { auth,db } from "../firebase";
import {createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    GoogleAuthProvider,
    signInWithRedirect
  } from "firebase/auth";
  import { addDoc,collection,deleteDoc,doc, onSnapshot, serverTimestamp, query, orderBy, } from "firebase/firestore";
import { useDispatch,useSelector } from "react-redux";
import { productAction } from "../store";
  

const Context = React.createContext();


const FirebaseContext = ({children}) => {

    const dispatch = useDispatch();

    const [User,setUser] = useState("");


    const wishlist = useSelector(state=>state.productCate.savedProducts)

    
    const googleSignIn = ()=>{
        const provider = new GoogleAuthProvider();

        return signInWithRedirect(auth, provider);
    }


    useEffect( ()=>{
        const unsubscribe= onAuthStateChanged(auth,user=>{

        //   setLoading(true);

         if(user){
          setUser(user.email);
           console.log(user)
          }else{
            setUser("")
            console.log("error");
          }
         });
         return unsubscribe;
       },[])

       const signUp = (email,password)=>{
         return createUserWithEmailAndPassword(auth,email,password)
       }
       const login = (email,password)=>{
       return signInWithEmailAndPassword(auth,email,password);
       
       }
       const logOut = ()=>{
        //  setUser(null);
        console.log("logout",User)
         signOut(auth);
       }
    
      
      // const getWishList = ()=>{
      //   // setLoading(true);

      //   const colRef = collection(db,user);

      //    const q = query(colRef,orderBy("createdAt")); 

      //    onSnapshot(q,(snapshot) => {   
      //       const payload = snapshot.docs.map((doc)=>{
      //           const obj = doc.data();
      //           return {...obj,delId:doc.id}
      //           })        
      //     dispatch(productAction.getWishList(payload) );

      //   //    setLoading(false);

      //     })

      //  }

      //  const addWishList = (obj)=>{
      //   const {id} = obj;

      //   let isAvailable = wishlist.find(item=>item.id===id);

      //   if(!isAvailable){
      //        const colRef = collection(db,user);
      //        addDoc(colRef,{...obj,createdAt:serverTimestamp()},)
      //       return  dispatch(productAction.addToFavourite(obj));
      //   }
      //   return ;

      //  }

       
      //  const del =  (Id) => {
    
      //   const idRef = doc(db, user, Id);
      //   deleteDoc(idRef);
      // };
    
  return (
    <Context.Provider value={{User,signUp,logOut,login,googleSignIn,}}>{children}</Context.Provider >
  )
}
export const useFireContext = () => {
    return useContext(Context);
  };
export {FirebaseContext,Context}
