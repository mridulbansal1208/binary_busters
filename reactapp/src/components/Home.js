import { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";



function Home() {

    const navigate = useNavigate()

    const [products,setproducts]= useState([]); 

    // useEffect(()=>{
    //     if(!localStorage.getItem('token')){
    //         navigate('/login')
    //     }
        
    // },[])


    useEffect(()=>{
        const url = 'https://localhost:4000/get-products';
        axios.get(url)
        .then((res)=>{
            console.log(res);
            if(res.data.products){
                setproducts=(res.data.products);

            }
        })
        .catch((err)=>{
            console.log(err)
            alert('serveer error');
        })

    },[])



    return 
    {
    <div>
        <Header/>
        { !!localStorage.getItem('token') && <Link to = '/add-product'  >ADD PRODUCT</Link>}


        {/* <h2>MY PRODUCTS:  </h2> */}
        <div className="d-flex justify-content-center flex-wrap">
        {products && products.length > 0 &&
         products.map((item,index)=>{


            return
            {
                <div className="card m-3">
                    <img width="300px" height="200px" src={'https://localhost:4000/'+item.pimage}/>
                    <p className="m-2">
                        {item.pname} | {item.Category}  
                        {/* problem ho skti h */}
                    </p>

                    <h3 className="m-2 text-danger ">
                        {item.price}
                    </h3>

                    <p className="m-2 text-success">
                        {item.pdesc}
                    </p>

                    {/* <p className="p-2">
                        {item.pname}
                    </p> */}

                </div>   
            }
         })}
    </div>


    </div>
    }
  }


  export default Home;