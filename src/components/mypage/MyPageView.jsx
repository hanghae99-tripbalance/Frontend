import React from 'react'
import * as t from './MyPageViewStyle'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { __myPageWriteGet, __myPageLikeGet } from '../../redux/modules/MyPageSlice'

export default function MyPageView() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state)
  console.log(data)

  useEffect(() => {
    dispatch(__myPageWriteGet({memberId : 1}));
  }, [dispatch]);

  useEffect(() => {
    dispatch(__myPageLikeGet({memberId : 1}));
  }, [dispatch]);

  return (
    <div>
      <t.myInformationWrap>
      <t.myInformation>
        개인정보 무엇이 들어갈 것인지?
        </t.myInformation>
      <t.mySelectInformation>
        <t.myInformationItem>내가 작성한 글 목록</t.myInformationItem>
        <t.myInformationItem>내가 좋아요 한 글</t.myInformationItem>
        <t.myInformationItem>내가 선택한 여행지</t.myInformationItem>
      </t.mySelectInformation>
      </t.myInformationWrap>
    </div>
  )
}
