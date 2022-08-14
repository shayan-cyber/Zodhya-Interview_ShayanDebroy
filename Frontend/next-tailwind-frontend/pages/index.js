import Head from 'next/head'
import Image from 'next/image'
import ForeCast from '../components/ForeCast'
import GetDataForm from '../components/GetDataForm'
import TwitterFeed from '../components/TwitterFeed'
import { useState } from 'react'
import {get_past_updates} from '../utils/backend-handlers/past_updates'
export default function Home({data}) {
  const [respdata, setRespdata] =useState(null)
  const changeRespData = (data) =>{
    setRespdata(data)
  }
  return (
    <div className='bg-blue-100 h-screen grid grid-cols-3 py-6 gap-8 px-12'>

      <div className='block col-span-2 w-full'>

        <GetDataForm changeRespData={changeRespData} />

        <ForeCast respdata={respdata} past_data ={data}/>
      </div>
      <div className='col-span-1'>
        <TwitterFeed/>
      </div>
    </div>
  )
}

export const getServerSideProps = async() =>{
  let res= await get_past_updates();
  let data = res?.data?.serializer_data
  console.log(res);

  return { props: { data } }
}
