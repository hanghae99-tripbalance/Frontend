<<<<<<< HEAD
<h1><b>🏝Trip Balane🏝</b></h3>
<h3>여행을 가고싶은데 어디로 갈지 모르겠다면,</h3>
<h3>밸런스 게임을 통해서 정해보세요!</h3>
<h4>📆프로젝트 기간 2022.11.04 ~ 2022.12.16</h4>

-------

<h2> ⚙ 서비스 아키텍쳐 ⚙</h2>

![image](https://user-images.githubusercontent.com/77573910/206633198-1de82ce6-a604-4b8d-a520-6a412251021b.png)
  
-------

</div>

<h2><b>🛠 Skill 🛠</b></h2>

<div>

|🔩 Part|⚙ Stacks ⚙|
|:---:|:---:|
|📃 Code| <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=HTML5&logoColor=white">  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=CSS3&logoColor=white"> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white"> | 
|🛠 Tech| <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=React&logoColor=white"> <img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=Redux&logoColor=white"> <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white"> <img src="https://img.shields.io/badge/React Router-CA4245?style=for-the-badge&logo=React Router&logoColor=white"> </br> <img src="https://img.shields.io/badge/styled components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white"> <img src="https://img.shields.io/badge/Kakao API-FFCD00?style=for-the-badge&logo=Kakao&logoColor=white">|
|⚙️ Tool| <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"> <img src="https://img.shields.io/badge/Jira-0052CC?style=for-the-badge&logo=Jira&logoColor=white"> <img src="https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=Swagger&logoColor=white"> <img src="https://img.shields.io/badge/Sentry-362D59?style=for-the-badge&logo=Sentry&logoColor=white"> |
|🔍 Cloud| <img src="https://img.shields.io/badge/Amazon S3-569A31?style=for-the-badge&logo=Amazon S3&logoColor=white"> <img src="https://img.shields.io/badge/AWS Amplify-FF9900?style=for-the-badge&logo=AWS Amplify&logoColor=white"> <img src="https://img.shields.io/badge/Route 53-FF9900?style=for-the-badge&logo=Amazon EC2&logoColor=white"> |

</div>

-------

<h3>Member</h3>
<p align=>
<img src="https://img.shields.io/badge/곽규현-61DAFB?style=for-the-badge&logo=react&logoColor=white"> 
<a href="https://github.com/kkh9960"><img src="https://img.shields.io/badge/GITHUB-61DAFB?style=for-the-badge&logo=GitHub&logoColor=white&link=https://github.com/kkh9960"/></a>
<br>
<img src="https://img.shields.io/badge/조광익-61DAFB?style=for-the-badge&logo=react&logoColor=white">
<a href="https://github.com/cho-light"><img src="https://img.shields.io/badge/GITHUB-61DAFB?style=for-the-badge&logo=GitHub&logoColor=white&link=https://github.com/cho-light"/></a>
<br>
<img src="https://img.shields.io/badge/이중오-61DAFB?style=for-the-badge&logo=react&logoColor=white">
<a href="https://github.com/jnwnddh"><img src="https://img.shields.io/badge/GITHUB-61DAFB?style=for-the-badge&logo=GitHub&logoColor=white&link=https://github.com/jnwnddh"/></a>
<br>
<img src="https://img.shields.io/badge/박성우-61DAFB?style=for-the-badge&logo=react&logoColor=white">
<a href="https://github.com/seongwoo9156"><img src="https://img.shields.io/badge/GITHUB-61DAFB?style=for-the-badge&logo=GitHub&logoColor=white&link=https://github.com/seongwoo9156"/></a>

-------
<h2> 기술 스택 & 라이브러리 사용 이유 </h2>

<details>
<summary> React </summary>
<div markdown="1">	
<br>
</div>
Component 단위의 작성을 통해 UI를 구성하는 개별적인 view단위의 개발을 하여 하나의 컴포넌트를 여러 부분에 다중 사용할수 있게 만들어 생산성과 유지 보수를 용이하게 하고 JSX를 사용해 컴포넌트를 쉽게 구성할수 있도록 해주며 Vitual DOM을 이용해 연산 비용을 줄일수 있기에 React 라이브러리를 사용하게 되었습니다.
</details>

<details>
<summary> Redux-Toolkik </summary>
<div markdown="1">	
<br>
</div>
컨포넌트 내에서 상태관리 함에 있어서 페이지 이동 하면서 데이터를 유지하기 어려워 전역으로 데이터 저장하는 방법으로 리덕스를 선택하였습니다. <br/>
리덕스 툴킷은 리덕스와 달리 action value와 action Creater를 정의하지 않고 작성할 수 있어 보일러 플레이트 코드를 줄일 수 있고, Redux 자체만으로는 스토어 설정이 어려워 추가적인 라이브러리도 설치해야 하지만, Toolkit의 경우 유틸리티 함수들이 대부분 포함 되어 있어 Redux사용에 추가적인 라이브러리 설치가 필요 없다는 점 때문에 Redux-Toolkit을 선택하게 되었습니다. <br/>
또한 비동기 통신을 수월하게 만들어주는 thunk가 있어 선택하였습니다.
</details>

<details>
<summary> Axios </summary>
<div markdown="1">	
<br>
</div>
axios를 선정한 이유는 Promise 기반으로 만들어졌기 때문에 데이터 다루기가 편리하고 브라우저 호환성이 뛰어나 선정했습니다. <br/>
또한 비동기로 HTTP통신을 할 수 있으며 return을 promise 객체로 해 주기 때문에 response 데이터를 다루기 쉬워 선택하였습니다.
</details>

<details>
<summary> React-Router </summary>
<div markdown="1">	
<br>
</div>
리액트라우터를 사용하지 않아도 다른 컴포넌트로 바꿔주는 방법은 있지만,
리액트라우터없이 라우팅을 구현하게 되면 사용자 입장에서 여러가지 치명적인 단점들이 많기에
위와같은 단점들을 해결하기 위해 리액트라우터를 사용하여 라우팅을 구현하였습니다.
</details>

<details>
<summary> Styled-components </summary>
<div markdown="1">	
<br>
</div>
여러 명이서 협업을 하다보니 CSS나 SASS로 작업을 하는 경우
classname 이름이 중복되어 원하지않는 스타일이 적용되는 일이 발생할수도 있는 위험이 있고,
스타일컴포넌트의 경우 재사용성이 높고 props의 활용을 통해 상황에 따라
변화하는 스타일링을 설정할수있는 장점등이 있기에 채택하게 되었습니다.
</details>

<details>
<summary> Kakao - API </summary>
<div markdown="1">	
<br>
</div>
회원가입의 번거로움을 싫어하는 유저들을 위해서 더 나은 사용자 편의를 위해
간편 소셜 로그인을 할수있도록 카카오 로그인을 구현하였고,
여행지 추천 사이트이다보니 맵 API를 이용하여 국내 각 여행지를 나타 낼수있는 지도가 필요하였는데,
지번,도로명 주소를 포함하여 지형/지하정보 등 국내에 한해 구글에 비해 조금 더 많은 정보를 제공하기에
판단하여 채택하였습니다.
</details> 

</br>

<h2> 트러블 슈팅 </h2>
<details>
<summary> 검색 필터 후 무한 스크롤 </summary>
<div markdown="1">	
<br>
</div>
게시글 검색을 구현하는 과정에서 카테고리별 조회 api를 분리하여 각각의 state에담아 구현하였는데, 다른 카테고리를 검색하는 경우 기존 데이터가 남아있고 무한스크롤이 중첩되는 문제가 발생하였습니다. <br><br>

해결방안 1 카테고리별 조회 api의 데이터 형식을 20개씩 늘려가는 방식으로 만들고 splice를 사용해 기존 검색 결과를 지우는 방법으로 문제를 해결하였습니다.<br>
<img src="https://user-images.githubusercontent.com/109525872/207901150-a476ab46-7e38-4a57-909d-b3cb542bdc21.png" width="600" height="280"><br>
하지만 카테고리를 변경 후에 검색하는 경우 state가 달라 기존 데이터를 삭제해주지 못하는 경우가 발생하였습니다.
  
해결방안 2 데이터가담기는 변수를 하나로 통합하여 검색데이터 전체를 하나의 변수로관리하고 검색시 state내의 데이터를 새롭게 재할당 무한스크롤로 들어오는 추가 데이터 -> 배열에 추가하엿습니다<br>
<img src="https://user-images.githubusercontent.com/109525872/207901204-cb5008e5-30cf-4bbe-9ff9-56a7cb25842b.png" width="600" height="280">
<img src="https://user-images.githubusercontent.com/109525872/207901230-032601af-f965-4217-ac1f-26f5b6bcf134.png" width="600" height="380">

</details>
<details>
<summary> 웹 페이지 성능 최적화 </summary>
<div markdown="1">	
<br>
</div>
lighthouse를이용해서 성능측정 결과 및접근성,권장사항 점수가 낮아 성능 개선과 페이지 최적화 진행 결정하였습니다.<br><br>
  
  <img src="https://user-images.githubusercontent.com/109525872/207904900-63b206f8-3e8a-4110-8402-261e817b3168.png" width="600" height="380">
  <img src="https://user-images.githubusercontent.com/109525872/207904411-103c4be3-8fb2-43f7-96fa-3d52f9d4cf7c.png" width="600" height="380">

1. 이미지 랜더링시간을줄이기위해 jpeg,svg,png => webp로통일 이미지용량줄이기를 진행하였습니다.<br><br>

2. 두번째 불필요한 자바스크립트를 줄이기를 시도하였습니다.<br><br>

3. 세번째 레이지로딩방식을통한 최적화방식을적용하엿습니다. 큰번들을 쪼개어서 사용자가 머무는페이지에 불필요한 번들파일은 로딩되지않고 동적으로처리해서 필요한 번들파일만쓰는형식으로
초기렌더링시간을 단축시키게하였습니다.<br>
![image](https://user-images.githubusercontent.com/109525872/207900994-0695d999-ad21-4148-998f-908f59863ffc.png)
</details> 

</br>

<h2> UT 개선사항 </h2>
<details>
<summary> 고객 반응 및 마케팅 결과 </summary>
<div markdown="1">	
<br>
</div>
  <img src = "https://user-images.githubusercontent.com/113871636/207862376-1904124c-6ce1-4d90-99dc-c562a723db3e.png">
</details>
<details>
<summary> 개선사항 </summary>
<div markdown="1">	
<br>
</div>
  <img src = "https://user-images.githubusercontent.com/113871636/207862502-99a468f5-693a-44ed-bbc0-0a546296082f.png">

</details> 

-------

  <h2> 🚌 Trip Balane 서비스 미리보기 (Mobile) </h2>

  |메인페이지 | 밸런스게임 | 게시판 | 댓글 | 마이페이지 | 카카오 로그인 |
  | :---:  | :---:  | :---:  | :---:  | :---:  | :---:  |
  | <img src="https://user-images.githubusercontent.com/77573910/207328228-9ed527b8-37c9-4b67-bc07-52aaad650351.gif"> | <img src="https://user-images.githubusercontent.com/77573910/207328269-ce2110a2-2c16-4aad-b8c1-a10be1cd5406.gif"> | <img src="https://user-images.githubusercontent.com/77573910/207328316-7bb0bb2c-4c16-4f04-af5b-a3389a3a136f.gif">  | <img src="https://user-images.githubusercontent.com/77573910/207328442-4c756582-5c74-4836-b9a5-120cb84a7335.gif">  | <img src="https://user-images.githubusercontent.com/77573910/207328857-1d006029-1c77-4f31-b901-3995f11fa623.gif"> | <img src="https://user-images.githubusercontent.com/77573910/207331945-34fff012-41cc-49db-8917-606f2d07b9e8.gif"> | 

</div>

-------
 <h2> 🚌 Trip Balane 서비스 미리보기 (Web) </h2>

<h3> 메인 페이지 </h3>

<img src="https://user-images.githubusercontent.com/77573910/207361774-514c6ea0-0d65-42e9-9c87-af04e8f6c338.gif" width="600" height="300" >
 
<h3> 밸런스 게임 </h3>
<img src="https://user-images.githubusercontent.com/77573910/207361837-3784b70a-b13c-4485-ac44-352efee10990.gif" width="600" height="300" >

<h3> 게시판 </h3>
<img src="https://user-images.githubusercontent.com/77573910/207362116-99ac93aa-46f1-4d65-95e6-b9ec2d8cfe0c.gif" width="600" height="300" >

<h3> 검색 </h3>
<img src="https://user-images.githubusercontent.com/77573910/207362518-92fe0f3e-a61f-4da6-a168-ef2a8c762c08.gif" width="600" height="300" >

<img src="https://user-images.githubusercontent.com/77573910/207362546-cf2c11c8-0527-4a10-851b-44b3904211ab.gif" width="600" height="300" >

<h3> 게시글 세부조회 좋아요 </h3>
<img src="https://user-images.githubusercontent.com/77573910/207362185-4f9005c8-4ab5-4179-ab56-974c9dcffd29.gif" width="600" height="300">

<h3> 글쓰기 </h3>
<img src="https://user-images.githubusercontent.com/77573910/207362231-9aa26fee-0313-4c0e-8311-9695bb78fc17.gif" width="600" height="300">

<h3> 댓글 </h3>
<img src="https://user-images.githubusercontent.com/77573910/207362390-b91ee5c7-2d56-4fda-b663-6d9993397ac0.gif" width="600" height="300">

<img src="https://user-images.githubusercontent.com/77573910/207362412-9f82b690-9707-453b-859a-75c989a59bcb.gif" width="600" height="300">

<h3> 다른 회원 프로필보기 </h3>
<img src="https://user-images.githubusercontent.com/77573910/207362811-33bbef1a-ae15-491b-b4f1-674bb71e8b8e.gif" width="600" height="300">

<h3> 마이페이지 </h3>
<img src="https://user-images.githubusercontent.com/77573910/207362876-46a912f8-d083-4e92-93f9-46cff1b4bfeb.gif" width="600" height="300">

<img src="https://user-images.githubusercontent.com/77573910/207362891-0eb7e051-cc86-468b-9cb9-15f4886dd455.gif" width="600" height="300">

-------
=======

>>>>>>> ebe5d662bc95c39f2dd4ecaefe2c58a0c1b84b66
