import {createContext, useContext,useEffect,useState,} from "react"
import { auth,db } from "../firebase";
import {createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
  } from "firebase/auth";
import { addDoc,collection,deleteDoc,doc, onSnapshot, serverTimestamp, query, orderBy, connectFirestoreEmulator, } from "firebase/firestore";
import { useDispatch,useSelector } from "react-redux";
import { productAction } from "../store";
import { useNavigate } from "react-router-dom";

const Context = createContext();


const FirebaseContext = ({children}) => {

    const dispatch = useDispatch();

    const [User,setUser] = useState("");
    const [signError,setError] = useState("")


    const wishlist = useSelector(state=>state.productCate.savedProducts)
    const navigate = useNavigate();
    
    const googleSignIn = async ()=>{
        const provider = new GoogleAuthProvider();

        try{
          const result = await signInWithPopup(auth, provider)
          if(result.user){
            navigate("/",{replace:true})
          }
        }
          catch(e){
            setError(e.code.replace("auth/","").replaceAll("-"," "));
            setTimeout(()=>{setError("")},3000)
          }
    }


    useEffect( ()=>{
        const unsubscribe= onAuthStateChanged(auth,user=>{

         if(user){
          setUser(user.email);
          }else{
            setUser("")
          }
         });
         return unsubscribe;
       },[])

       const signUp = async (email,password)=>{

         try{
          const result = await createUserWithEmailAndPassword(auth,email,password);
          if(result.user){
            navigate("/",{replace:true})
          }
              }
         catch(e){
                setError(e.code.replace("auth/","").replaceAll("-"," "));
                setTimeout(()=>{setError("")},3000)
         }
       }

       const login = async (email,password)=>{
          try{
            const result = await signInWithEmailAndPassword(auth,email,password);
            if(result.user){
              navigate("/",{replace:true})
            }
                }
          catch(e){
                  setError(e.code.replace("auth/","").replaceAll("-"," "));
                  setTimeout(()=>{setError("")},3000)
          }
       
       }
       const logOut = ()=>{
         signOut(auth);
       }
    
      
      const getWishList = ()=>{

        const colRef = collection(db,User);

         const q = query(colRef,orderBy("createdAt")); 

         onSnapshot(q,(snapshot) => {   
            const payload = snapshot.docs.map((doc)=>{
                const obj = doc.data();
                return {...obj,delId:doc.id,createdAt:""}
                })   
          dispatch(productAction.getWishList(payload) );


          })

       }

      

       const addWishList = (obj)=>{
        const {id} = obj;

        if(!User){
          setError("please sign in to save product");
                  setTimeout(()=>{setError("")},3000)
        }

        let isAvailable = wishlist.find(item=>item.id===id);

        if(!isAvailable){
             const colRef = collection(db,User);
             addDoc(colRef,{...obj,createdAt:serverTimestamp()},)
            return  dispatch(productAction.addToFavourite(obj));
        }
        return ;

       }

       
       const del =  async(Id) => {
    
        const idRef = doc(db, User, Id);

         deleteDoc(idRef);
       
      };
    
  return (
    <Context.Provider value={{User,signUp,logOut,login,googleSignIn,signError,getWishList,addWishList,del}}>{children}</Context.Provider >
  )
}
export const useFireContext = () => {
    return useContext(Context);
  };
export {FirebaseContext,Context}
