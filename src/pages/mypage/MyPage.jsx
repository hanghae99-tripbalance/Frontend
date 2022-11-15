import React from 'react'
import Layout from '../../component/Layout'
import Header from '../../component/Header'
import Footer from '../../component/Footer'
import MyPageView from '../../components/mypage/MyPageView'


export default function MyPage() {
  return (
    <Layout>
      <Header/>
        <MyPageView/>
      <Footer/>
    </Layout>
  )
}
