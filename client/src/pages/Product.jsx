import React, { useEffect, useState } from 'react'
import SummaryApi from '../common/SummaryApi'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import CardProduct from '../components/CardProduct'
import Loading from '../components/Loading'

const Product = () => {
  const [productData,setProductData] = useState([])
  const [page] = useState(1)
  const [loading,setLoading] = useState(false)
  
  const fetchProductData = async()=>{
    try {
        setLoading(true)
        const response = await Axios({
           ...SummaryApi.getProduct,
           data : {
              page : page,
           }
        })

        const { data : responseData } = response 

        if(responseData.success){
          setProductData(responseData.data || [])
        }else{
          setProductData([])
        }

    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(()=>{
    fetchProductData()
  },[])

  return (
    <section className='container mx-auto p-4'>
      <h2 className='text-xl font-semibold mb-4'>All Products</h2>
      {
        loading ? (
          <Loading/>
        ) : (
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {
              productData.map((p)=>(
                <CardProduct key={p._id} data={p}/>
              ))
            }
          </div>
        )
      }
      {
        !loading && !productData.length && (
          <p className='text-center text-sm text-neutral-500 mt-4'>No products found.</p>
        )
      }
    </section>
  )
}

export default Product
