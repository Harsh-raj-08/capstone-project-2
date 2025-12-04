import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Header from './components/Header'
import Footer from './components/Footer'
import GlobalProvider from './provider/GlobalProvider'
import Axios from './utils/Axios'
import SummaryApi from './common/SummaryApi'
import { setAllCategory, setAllSubCategory, setLoadingCategory } from './store/productSlice'
import AxiosToastError from './utils/AxiosToastError'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        dispatch(setLoadingCategory(true))
        const [categoryResponse, subCategoryResponse] = await Promise.all([
          Axios({ ...SummaryApi.getCategory }),
          Axios({ ...SummaryApi.getSubCategory })
        ])

        if (categoryResponse?.data?.success) {
          dispatch(setAllCategory(categoryResponse.data.data))
        }

        if (subCategoryResponse?.data?.success) {
          dispatch(setAllSubCategory(subCategoryResponse.data.data))
        }
      } catch (error) {
        AxiosToastError(error)
      } finally {
        dispatch(setLoadingCategory(false))
      }
    }

    fetchInitialData()
  }, [dispatch])

  return (
    <GlobalProvider>
      <Header/>
      <main className='min-h-[calc(100vh-120px)]'>
        <Outlet/>
      </main>
      <Footer/>
    </GlobalProvider>
  )
}

export default App
