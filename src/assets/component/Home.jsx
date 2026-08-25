// import  React from 'react'
import axios from "axios";
import { useEffect,useState }from "react";

export const Home=() => {
  const [data,setdata]=useState({})

  useEffect(() => {

    const fetchdata= async () => {
      try{
          const response=await axios.get("https://jsonplaceholder.typicode.com/users/4")

          setdata(response.data)
      }catch(error){
         console.error(error)

      } 
    }

      fetchdata()
  },[])

  return(
    <div>
      <h1>Welcome</h1>
      <h2>{data.name}</h2>
    </div>
     
  );

}