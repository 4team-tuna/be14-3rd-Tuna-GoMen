

# be14-3rd-Tuna-GoMen
❤️이혜영 🩷김성민 🧡이준규 💛서민종 🖤한석현
![고멘로고](https://github.com/user-attachments/assets/9fe1378f-eec1-4d9f-8ece-cf6b387bc336)
## GoMen -  코딩 멘토-멘티 매칭 서비스

### 목차
1. [📁 프로젝트 기획](#1)
   - [1-1. 개요](#1-1)
   - [1-2. 배경 및 필요성](#1-2)
   - [1-3. 주요 기능](#1-3)
2. [🔎 Figma](#2)
   - [2-1. 와이어프레임](#2-1)
   - [2-2. 스토리보드](#2-2)
3. [📜기능명세서](#3)
   - [3-1. WBS](#3-1)
   - [3-2. 요구사항 정의서](#3-2)
4. [✍🏻 테스트 계획 및 결과보고서](#4)
   - [4-1. Main Page & Start Page](#4-1)
   - [4-2. Login & SignUp Page](#4-2)
   - [4-3. MyPage](#4-3)
   - [4-4. Message](#4-4)
   - [4-5. Free Boards](#4-5)
   - [4-6. Team Recruit Boards](#4-6)
   - [4-7. MentorList](#4-7)
   - [4-8. Mentoring](#4-8)
   - [4-9. Report](#4-9)
   - [4-10. ADMIN](#4-10)
5. [🛠️ 기술 스택](#5)
6. [📗 동료평가](#6)
---

## 팀원 소개

| 이혜영 | 이준규 | 한석현 | 김성민 | 서민종 |
|--------|--------|--------|--------|--------|
|<img src="https://github.com/user-attachments/assets/90d69166-6eee-4d9b-bdd0-ac230c4b42ef" width="200" height="200"> | <img src="https://github.com/user-attachments/assets/058daceb-2a13-4c5d-a6c6-59dfd3b5e62f" width="200" height="200"> | <img src="https://github.com/user-attachments/assets/c17d7bc2-4a71-4323-8fb4-7fb38f518daa" width="200" height="200"> | <img src="https://github.com/user-attachments/assets/2e2ec6dc-d653-4fbe-85a5-d8cb2706097b" width="200" height="200"> | <img src="https://github.com/user-attachments/assets/369c6510-e8bd-48f4-b7d4-c1ed56d4fcdb" width="200" height="200"> |
| ISTP | ESTP | ENFP | ESFP | ENFP |



---

## 📁 1. 프로젝트 기획
### 1-1. 개요
이 플랫폼은 개발자를 준비하는 학생 및 준비생들이 경력 기반으로 검증된 멘토 혹은 GitHub 링크 등을 통해 실력을 인증받은 멘토들과 1:1 또는 팀 단위로 멘토링을 받을 수 있는 커뮤니티 기반 웹사이트입니다. 사용자는 개발 실력 향상을 위한 멘토링뿐 아니라, 서로 프로젝트 팀을 구성하거나 개발 정보를 공유하며 실무 경험을 쌓을 수 있습니다.
멘토의 신뢰성 확보와 체계적인 커뮤니케이션 기능을 통해, 사용자에게 보다 실질적이고 질 높은 성장 경험을 제공합니다.

### 1-2. 배경 및 필요성
최근 개발자 취업 시장은 경쟁이 치열해지고 있으며, 단순 이론 학습만으로는 실무 역량을 갖추기에 한계가 있습니다. 준비생들은 실제 개발 환경에서의 경험 부족, 멘토 부재, 협업 경험 부족 등의 문제를 공통적으로 겪고 있습니다.

기존의 멘토링 서비스는 멘토의 전문성과 신뢰도 검증이 어려운 경우가 많았으나, 본 플랫폼은 실제 경력 기반 또는 GitHub 등 외부 포트폴리오를 통해 검증된 멘토만 등록할 수 있어 신뢰성 있는 멘토링이 가능합니다.

또한, 사용자는 멘토링을 통해 실시간 피드백을 받고, 커뮤니티 게시판을 통해 정보를 공유하며, 프로젝트 팀을 구성해 협업 능력까지 키울 수 있습니다. 이러한 환경은 개발자로서의 성장과 커리어 준비에 큰 도움을 줄 것입니다.


### 1-3. 주요 기능
1.함께 프로젝트를 진행할 팀원 모집 및 생성 가능
2.인증된 멘토들에게 팀단위, 개인단위의 멘토링 가능
3.칭호, 커뮤니티등을 통해 학습욕구 및 정보공유 가능
4.별점및 리뷰 시스템을 통해 사용자 퀄리티 향상 가능
5.신고를 통한 벌점 제도를 통해효율적인 회원관리 가능

## 🔎 2. Figma
### 2-1. 와이어프레임
![image](https://github.com/user-attachments/assets/26bc4354-95e2-44f9-a598-31d66906b72e)
### 2-2. 스토리보드 
🗂️ 스토리보드
이 관리자 시스템은 운영자가 멘토 요청, 신고 관리, 칭호 부여 등 다양한 사용자 관련 업무를 효율적으로 처리할 수 있도록 구성되어 있습니다. 전체적인 흐름은 로그인 후 관리자 대시보드에서 각 기능별 화면으로 진입하여 데이터를 확인하고, 처리 및 관리를 할 수 있도록 설계되어 있습니다.

관리자는 먼저 로그인 후 관리자 전용 메인 페이지에 진입합니다. 이곳에서는 전체 시스템 관리 기능의 진입점 역할을 하는 버튼들이 제공되며, ‘멘토 요청 관리’, ‘신고 관리’, ‘칭호 관리’ 등의 페이지로 이동할 수 있습니다. 각각의 버튼은 floating-back 스타일로 우측 하단에 고정되어 있어 사용자가 어느 위치에서든 쉽게 홈으로 돌아갈 수 있도록 합니다.

‘멘토 요청 관리’ 페이지에서는 일반 사용자들이 신청한 멘토 승급 요청 목록이 표시됩니다. 각 요청 항목은 신청자의 닉네임과 함께 ‘수락’ 또는 ‘거절’ 버튼으로 구성되어 있으며, 관리자가 수락 버튼을 클릭할 경우 해당 유저는 멘토 권한(isMentor: 'Y')이 부여됩니다. 처리된 요청은 즉시 화면에 '처리 완료'로 변경되어, 관리자가 어떤 요청을 이미 처리했는지 명확히 알 수 있도록 합니다.

이후 관리자는 신고 처리를 위해 ‘신고 관리’ 페이지로 이동할 수 있습니다. 이 화면에서는 사용자가 작성한 게시글이나 댓글에 대해 들어온 신고 목록이 테이블 형식으로 정리되어 있으며, 각 항목은 신고 대상(게시글/댓글 ID), 신고자 ID, 신고 사유, 처리 상태 등으로 구성됩니다. 신고 사유는 ‘신고사유 보기’ 버튼을 통해 모달 창으로 확인할 수 있으며, 관리자에게는 벌점 사유를 선택할 수 있는 드롭다운 메뉴와 ‘처리’ 버튼이 함께 제공됩니다. 벌점이 부과되면 해당 유저의 violationScore가 누적되며, 누적 점수가 100점을 초과할 경우 자동으로 탈퇴 처리(isQuitted: 'Y')가 진행됩니다. 또한 게시글이나 댓글이 문제될 경우 블라인드 처리 버튼을 통해 콘텐츠를 숨길 수 있습니다.

관리자는 이어서 칭호를 관리하기 위해 ‘칭호 관리’ 페이지로 진입합니다. 이 페이지에서는 시스템 내에서 사용자들에게 부여되는 칭호들을 추가하거나 삭제할 수 있으며, 칭호명과 달성 조건이 리스트 형태로 제공됩니다. ‘추가하기’ 버튼을 클릭하면 입력 폼이 나타나고, 새 칭호 정보를 입력 후 저장하면 리스트에 바로 반영됩니다. 필요 시 각 칭호 옆에 있는 ➖ 버튼을 눌러 삭제도 간편하게 할 수 있어, 관리자가 칭호 정책을 유동적으로 운영할 수 있습니다.

전체적으로 이 시스템은 관리자들이 데이터 확인과 처리를 빠르게 할 수 있도록 최소한의 클릭만으로 원하는 기능에 접근할 수 있도록 구성되어 있으며, 사용자 요청, 신고, 역할 변화 등의 흐름을 자연스럽게 이어주는 구조로 되어 있습니다. 모든 기능은 Vue 3 Composition API와 Axios 기반으로 구성되어 있으며, 화면 전환 없이 실시간 상태 반영이 가능하도록 UX 설계가 되어 있습니다.

시스템 확장이나 추가 기능 도입 시에도 현재 구조를 기반으로 페이지를 추가하거나 API를 연동하는 방식으로 손쉽게 대응할 수 있어 확장성 또한 우수합니다. 필요한 경우 통계 대시보드, 알림 설정, 관리자별 로그 기능 등을 통해 더욱 전문적인 시스템으로 발전시킬 수 있습니다.
## 📜 3. 기능명세서
### 3-1. WBS
[WBS 링크](https://docs.google.com/spreadsheets/d/19VZI_1LJ8Jx2r8srhHZ5M0GApO66an1NkPZsmz7pS5Y/edit?gid=1013678623#gid=1013678623)
![image](https://github.com/user-attachments/assets/a53d6ee0-8df2-44a4-b11f-a0cd708854c3)

### 3-2. 요구사항 명세서
[요구사항 명세서 링크](https://docs.google.com/spreadsheets/d/19VZI_1LJ8Jx2r8srhHZ5M0GApO66an1NkPZsmz7pS5Y/edit?gid=0#gid=0)

![image](https://github.com/user-attachments/assets/8e653510-e6ef-4c2e-927d-ec7bceee39c6)


## ✍🏻 4. 테스트 계획 및 결과보고서
### 4-1. Main Page & Start Page

<details><summary> Main Page  </summary>
<img src="https://github.com/user-attachments/assets/9a83b4a1-77d1-498e-a3ee-3b69f9a326e7" width="500" />
</details>

<details><summary> Start Page </summary>
      <img src="https://github.com/user-attachments/assets/bff787fc-3d34-4cc0-bba0-49c1c7a61737" width="500">
</details>

### 4-2. Login & SignUp Page
<details><summary> SignUp Page </summary>
   <img src="https://github.com/user-attachments/assets/0045a0fb-b11d-4133-8687-da9cd81c3846" width="500">
</details>

<details><summary> Login Page </summary>
   <img src="https://github.com/user-attachments/assets/ca84cb83-a2c1-40b8-ba7a-2d567754e720" width="500">
</details> 

<details><summary> 벌점100점 탈퇴처리 </summary>
   <img src="https://github.com/user-attachments/assets/22a67351-2cbc-40bb-8fcf-b3e1c1899ae7" width="500">
</details> 

### 4-3. MyPage
<details><summary> MyPage </summary>
   <img src="https://github.com/user-attachments/assets/18a850ff-995f-47be-bcfd-b43fe396f7e0" width="500">
</details>

<details><summary> Edit Information </summary>
   <img src="https://github.com/user-attachments/assets/e302dc79-4180-40ee-a3e2-9b72a4d90c5f" width="500">
</details>

<details><summary> Change Profile Picture </summary>
   <img src="https://github.com/user-attachments/assets/68d04479-e7c7-4335-add2-9f030267e238" width="500">
</details>

<details><summary> Change Password </summary>
   <img src="https://github.com/user-attachments/assets/c897f734-dbec-4382-bdd9-236001dc6e2b" width="500">
</details>

<details><summary> Add Career </summary>
   <img src="https://github.com/user-attachments/assets/30923ed1-ef46-491f-a8e5-e4087a5a3a0e" width="500">
</details>

<details><summary> Delete Career </summary>
   <img src="https://github.com/user-attachments/assets/213a39c5-ccea-42cc-bff0-ee71308ab881" width="500">
</details>

<details><summary> Apply Mentor Authentication </summary>
   <img src="https://github.com/user-attachments/assets/809dcf1b-664b-4542-9e15-c2871f7d4c01" width="500">
</details>

### 4-4. Message
<details><summary> MessageBox </summary>
   <img src="https://github.com/user-attachments/assets/8ba0f469-9eb6-4a2f-9bd1-0ec84335c07c" width="500">
</details>

<details><summary> Send Message </summary>
   <img src="https://github.com/user-attachments/assets/983d331d-6b19-4ffe-9896-31ec44c46508" width="500">
</details>

### 4-5. Free Boards

<details><summary> Board view Page </summary>
      <img src="https://github.com/user-attachments/assets/dd25ea85-6153-4b5a-96a8-c8179f4805bd" width="500">
</details>
<details><summary> Write Post Page </summary>
      <img src="https://github.com/user-attachments/assets/ff04781e-8e4a-4260-b032-1a44c1ae2b0b" width="500">
</details>
<details><summary> Edit Post Page </summary>
      <img src="https://github.com/user-attachments/assets/b8466a4e-2f75-490b-a4cc-5f340b2db25f" width="500">
</details>
<details><summary> Free Board Page </summary>
      <img src="https://github.com/user-attachments/assets/b8d82c13-3172-41e6-8588-a8694659112c" width="500">
</details>
<details><summary> 게시글 블라인드 처리 </summary>
<img src="https://github.com/user-attachments/assets/ee9ecd91-f290-4a88-84b7-ccb9f768f40b" width="500">
</details> 

### 4-6. Team Reacruit Boards


### 4-7. MentorList
<details><summary> 멘토 리스트 등록 </summary>
<img src="https://github.com/user-attachments/assets/ea75a618-f2d7-46b0-8c0d-30f899a1ab42" width="500">
</details> 

<details><summary> 멘토 리스트 신청(개인) </summary>
<img src="https://github.com/user-attachments/assets/7b890eb3-00bc-476b-b6ec-db654d902ead" width="500">
</details> 

<details><summary> 멘토 리스트 신청(팀) </summary>
<img src="https://github.com/user-attachments/assets/6a344f93-4da8-4b46-adee-85d8a2cbf0af" width="500">
</details>

<details><summary> 멘토 리스트 신청 수락(개인) </summary>
<img src="https://github.com/user-attachments/assets/4c4e2607-0d60-49b2-a954-5735bea26a6c" width="500">
</details> 

<details><summary> 멘토 리스트 신청 수락(팀) </summary>
<img src="(https://github.com/user-attachments/assets/3d15dffa-348f-48a0-abd8-565eda493745" width="500">
</details> 

### 4-8. Mentoring
<details><summary> 멘토링 질문 등록 </summary>
<img src="https://github.com/user-attachments/assets/a7a95b18-8940-4c30-9125-3ec3ebe958d5" width="500">
</details> 

<details><summary> 멘토링 연장 요청 </summary>
<img src="https://github.com/user-attachments/assets/7aa733d5-0d32-415e-bcc5-fa04f035fda3" width="500">
</details> 

<details><summary> 멘토링 연장 요청 수락 </summary>
<img src="https://github.com/user-attachments/assets/098dd849-167d-4859-ac72-4002ebbd666d" width="500">
</details> 

<details><summary> 멘토링 연장 요청 거절 </summary>
<img src="https://github.com/user-attachments/assets/d8a581d9-a191-4cc7-8ed3-05dfeca150d2" width="500">
</details> 


### 4-9. Report
<details><summary> 게시글 신고 </summary>
<img src="https://github.com/user-attachments/assets/de383072-9dec-4dfc-b7f6-dcbf84636951" width="500">
</details> 


### 4-10. ADMIN
<details><summary> 신고처리 </summary>
<img src="https://github.com/user-attachments/assets/97ecd2e8-7fdc-4e8d-a061-1e15d1eae476" width="500">
</details> 

<details><summary> 멘토요청 처리 </summary>
<img src="https://github.com/user-attachments/assets/e3223367-6e67-4a39-8441-66ae8c4ce93c" width="500">
</details> 

<details><summary> 칭호 추가 </summary>
<img src="https://github.com/user-attachments/assets/f2ce49bf-3c56-4193-96d4-8dc13f11a3e7" width="500">
</details> 

## 🛠️ 5. 기술 스택
## Frontend
![Vue](https://img.shields.io/badge/Vue%203-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML](https://img.shields.io/badge/HTML-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JSON Server](https://img.shields.io/badge/JSON%20Server-black?style=for-the-badge)

## ⚙️ Tool
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-007ACC?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)

## 📗 6.동료평가
|이혜영| peer review |
|:---:|-|
|한석현|기능 개발을 훌륭하게 함과 더불어 협업을 위한 깃허브 브랜치 관리, 발표준비까지 완벽하게 수행하시는 모습을 보고 큰 자극을 받았습니다. 프로젝트를 진행하며 길을 잃어갈 때쯤 방향을 제시해 주셔서 원만하게 프로젝트가 진행되고 성공적으로 결과물을 낼 수 있었던 것 같습니다. "모두 잘 하는 멀티플레이어적인 모습을 가장 닮고 싶은 팀원."|
|이준규*|백엔드 프로젝트에서도 너무 훌륭한 팀원이었지만 프론트엔드 프로젝트에서는 그저 ‘빛’ 이었다. 디자인적인 재능이 많이 부족한 팀원들에게 너무나 소중한 존재였다. figma작업을 너무 훌륭하게 해주었기에 다른 팀원들이 figma를 바탕으로 각자 맡은 도메인을 완성할 수 있었고 공통으로 사용되는 components를 프로젝트 시작과 동시에 누구도 부탁하지 않았음에도 직접 만들어서 pr을 올려놓은 것 덕분에 페이지를 구성하는 것이 너무 편했다. 팀내에서 너무나 의지되고 힘이 되는 존재였다.  이것이 우리가 혜영님을  대장님이라고 부르는 이유다. 개발자를 준비하는 입장에서 디자인, PPT 작성에 시간 투자하는 것 보다 개발하는 것에 욕심이 생길 수 있음에도 부족한 팀원들을 대신하여 잘 만들어 주었기에 양질의 발표자료가 나온 것 같다. 정말 감사한 팀원이다.|
|김성민|팀원이 모두 남자이고 흡연자들이라 힘들었을텐데 그에 불평불만을 하시지 않고 잘 적응 해주셨고 기능 구현에 있어서 너무 잘해주셨습니다. 그리고 ppt도 만드시고 발표 준비 시간도 별로 없었을텐데 힘든 와중에 정말 잘해주셨습니다. 혜영님이 있어서 프로젝트를 무사히 끝낼 수 있었습니다.|
|서민종|나이 차이도 있고 혼자서 여성 팀원이신데도 주눅들지 않고 팀에서 잘 적응하시는 모습이 너무 인상깊었습니다. 다른 팀원분들을 잘 이해해주시고 필요할 때는 의견도 적극적으로 제시하면서 열심히 진행하셔서 많은 도움을 받았다고 생각합니다. 마지막 프로젝트 발표에서도 각 기능과 예시 등을 잘 요약하고 이해하기 쉽게 설명까지 잘 마무리해주셔서 믿음직스러웠습니다.|

|한석현|peer review |
|:---:|-|
|이혜영*|석현님 덕분에 프로젝트가 길어지면서 생길 수 있었던 팀원들의 피로감이나 긴장감이 자연스럽게 풀렸던 것 같아요. 늘 밝은 에너지로 팀의 분위기를 잘 이끌어주셔서 정말 감사했습니다. 그리고 발표 때도 정말 야무지고 자신감 있는 모습이 인상 깊었어요. 석현님 덕분에 저희 발표가 훨씬 더 깔끔하고 설득력 있게 마무리될 수 있었던 것 같습니다. 특히 관리자 페이지 구현에서 멘토 요청 관리, 신고 처리 등 다른 페이지들과 연동되는 복잡한 기능들을 맡아주시면서도 전체적인 구조를 이해하고 잘 반영해주신 점이 대단했습니다. 다양한 코드 흐름을 읽고 조율해야 하는 번거로움이 있었을 텐데도 세심하게 구현해주신 부분에서 석현님의 집중력과 책임감을 느낄 수 있었습니다.|
|이준규*|개발, 분위기 메이킹, 발표 모든 것을 담당한 소중한 팀원이다. 전날 밤까지도 팀원들이 기능 개발을 완벽하게 끝내지 못 해서 불안하고 힘들었을 텐데 그 안에서 본인이 할 수 있는 최선의 것들을 해줘서 너무 고맙다. 팀원들의 사소한 말에도 항상 귀 기울이고 대답해주는 자세 또한 본 받을만하다.  이번 프로젝트에서 팀원들이 db.json 파일과 index.js 파일을 공유했기에 한 명의 pr을 받을 때마다 충돌을 해결해야 했다. 귀찮고 번거로운 일임에도 팀원들의 pr을 제일 많이 받아줬다. 협업에 있어서 정말 중요한 자세라고 생각한다. 나 하나가 아닌 팀을 생각하는 마인드가 기본적으로 깔려 있어야 이런 태도들이 나온다고 생각한다. 이 프로젝트를 마지막으로 팀원이 바뀐다. 나에게 먼저 같이 팀하자고 손 내밀어준 석현님에게 너무 감사하고 행복한 팀이었다고 전해주고 싶다.|
|김성민|항상 우리 조의 분위기를 좋게 해주고 기발하고 유쾌한 아이디어를 많이 내 주셨으며 또한 기능 구현에서  어려운 신고 기능 로직 구현을 하는 등 자신의 맡은 바 일에 최선을 다해주셨습니다. 그리고 프로젝트 중간에서 팀원들 간의 의견 소통을 원활하게 해주고 도움을 주는 등 팀원들이 조화를 잘 이루게 해주셨습니다. |
|서민종|저번에도 같은 팀으로서 프로젝트를 진행했지만 매번 느끼는 것이 사람 자체가 재미있고 다른 분들을 행복하게 하는 매력이 있는 분이라고 생각합니다. 프로젝트를 진행하면서 중간에서 늘 팀원들끼리의 화합에 신경쓰면서 분위기 좋게 프로젝트가 진행될 수 있도록 하는데 가장 큰 역할을 해냈습니다. 또한, 문서 관리와 발표 자료를 만드는 데에도 많은 도움을 주셨습니다.|

|이준규|peer review |
|:---:|-|
|이혜영*|저번 프로젝트에 이어 이번에도 함께하게 되어 정말 든든했습니다. 무엇보다도 제가 구현에 어려움을 겪거나 고민할 때마다 배려해주시는 태도가 정말 감사했어요. 특히 팀 모집 게시판 구현에서 보여주신 디테일은 인상적이었습니다. 팀 신청자와 팀 모집자 간의 UI를 명확하게 구분해 표현한 점, 로그아웃 상태에서는 신청 버튼을 비활성화시키는 등의 세세한 UX 고려는 준규님이 얼마나 사용자 입장에서 생각하며 개발하는지를 잘 보여주는 부분이었습니다.또한 리뷰 페이지도 도맡아주셔서, 발표 직전까지 별점 데이터를 JSON 서버에 반영되도록 수정하고, 평균 별점까지 갱신되게 만들어 퀄리티를 한층 높여주셨습니다. 이 과정에서 마지막까지 최선을 다해주신 모습이 정말 인상 깊었어요. 그리고 PR 리뷰도 항상 빠르게 확인해주시고 피드백을 반영해주셔서, 전체 개발 흐름을 원활하게 이어갈 수 있었습니다.|
|한석현|비전공자임에도 불구하고, 엄청난 양의 노력을 통해 기능개발에 상당한 부분을 담당했고, 주도적으로 프로젝트를 이끌어 주시면서 계획된 일정 안에 개발이 진행되고 다음단계로 넘어갈 수 있도록 하는데 큰 도움이 되었습니다. "열정과 노력을 가장 닮고 싶은 팀원."|
|김성민|처음 주제 회의 부터 좋은 아이디어를 많이 내주시고 팀을 이끌어 가려는 우리팀의 정신적 지주입니다. 그리고 항상 자신의 부족한 점이 있거나 모르는 부분에서는 그 점을 채워가려고 노력하는 모습이 너무 보기 좋았습니다.|
|서민종|팀 프로젝트를 진행함에 있어서 확실한 방향성을 빠르게 잡는 길잡이 역할을 잘 해주신 팀원분이라고 생각합니다. 구현하고 싶은 기능이나 서비스에 대한 아이디어를 빠르게 캐치하는 능력이 있습니다. 이를 토대로 프로젝트가 중간에 다른 길로 새거나 멈추지 않고 꾸준히 앞으로 나아갈 발판을 마련해 주셨습니다. 또한, 많은 기능들을 구현하시고 테스트 케이스 작성에도 많은 도움을 주셨습니다.|

|김성민|peer review |
|:---:|-|
|이혜영*|성민님은 이번 프로젝트의 핵심이라고 생각합니다. 멘토링 기능이라는 가장 중요한 파트를 책임감 있게 맡아 끝까지 완성해주신 점이 정말 대단했습니다. 특히 멘토링 요청부터 수락, 별점까지 이어지는 전반적인 흐름을 구현하면서 세세한 오류 처리나 예외 케이스까지도 꼼꼼히 챙겨주셔서 기능의 완성도가 훨씬 높아졌어요. 발표 전날까지도 묵묵히 계속 디버깅하고 최적화 작업을 해주시던 모습이 아직도 기억에 남습니다. 게다가 깃허브 관리도 항상 중심을 잘 잡아주셔서 협업이 훨씬 수월했습니다. 충돌 관리나 PR 머지 타이밍 조절도 잘 해주셔서 전체적인 코드 흐름이 끊기지 않았던 것 같아요. 보이지 않는 곳에서 가장 많이 고생해주신 진정한 1등 공신이라고 생각합니다. 항상 감사하고, 함께 작업할 수 있어서 정말 좋았습니다.|
|한석현|프로젝트의 가장 메인 기능인 멘토링과 관련된 부분을 담당하여 개발하였으며, 능숙은 협업툴 사용과 분석 능력으로 팀원들의 깃허브 병합 문제 처리나 코드 문제들을 해결하는데 큰 기여를 해주셨습니다 "협업 능력을 가장 닮고 싶은 팀원."|
|이준규*|멘토링 커뮤니티에서 멘토링을 맡아 백엔드부터 프론트엔드까지 남들보다 두 배 가까이 되는 양을 고민하고 작업해야 했다. 그럼에도 힘든 내색 없이 너무 열심히 임해줘서 감사하다. 프론트엔드는 물리적으로 시간이 너무 부족했기에 양이 많고 복잡한 구조를 담당한 멘토링이 당일 새벽이 되어서야 완성되었지만 나를 포함한 그 어떤 팀원도 그를 원망하지 않고 도와줬던 이유는 그동안 성민님이 어떤 자세로 프로젝트를 임했는지 알기 때문이라 생각한다. 알고있는 지식이 많음에도 다른 팀원이 작업한 것 중 이상한 점이 발견되었을 때 항상 질문을 하는 태도는 너무나 본받을 태도인 것 같다. 팀 프로젝트에 있어서 실력보다 중요한 것이 있다면 바로 이런 성민님의 태도이지 않을까 생각된다.
|
|서민종|프로젝트에서 가장 중요한 부분은 협업이고 이를 github를 통해서 잘 구현해주셨습니다. 작업 과정에서 제가 프로그램에 대한 이해도가 낮아 많은 충돌이 일어났을 때 직접 나서서 충돌 오류 해결과 각 팀원들의 작업 과정을 통합하여 프로젝트 완성에 많은 기여를 해주셨다고 생각합니다. 또한, 이번 프로젝트의 메인 기능인 멘토링 기능이 구조적으로 복잡한대도 무리없이 훌륭히 구현하셨습니다. |

|서민종|peer review |
|:---:|-|
|이혜영*|민종님은 ‘배우는 속도가 빠르다’는 말이 어울리는 분이셨습니다. 프로젝트 초반 Figma 디자인을 다루실 때에는 감을 조금 잡는 데 시간이 걸렸지만, 금세 적응하셔서 훌륭한 결과물을 만들어내셔서 깜짝 놀랐습니다. UI/UX적인 감각도 점점 더 좋아지셔서 마이페이지나 쪽지 기능 구현에서도 유저 친화적인 요소가 잘 드러났던 것 같아요.특히 로그인 부분에서는 유레카 서버와의 연동도 하시고, 실제로 잘 연결해내신 점이 인상 깊었습니다. 발표에서 마이페이지나 쪽지 기능이 충분히 부각되지 못해 아쉬웠을 수도 있겠지만, 그만큼 깊이 있게 잘 구현해주신 걸 저는 알고 있어서 정말 감사한 마음입니다. PR도 항상 빠르게 리뷰해주시고, 피드백도 반영 속도가 굉장히 빨라서 협업 과정이 매우 수월했습니다. 배울 점이 많은 개발자라고 생각합니다|
|한석현|비전공자임에도 불구하고 다들 기피하던 spring security 부분을 맡아 개발해 주셨으며, 뛰어난 프로그래밍 능력과 이해력으로 기능 구현을 성공적으로 해주셨습니다. MSA와 sping security를 적용하여 결과물을 확인 할 수 있었던 데에 가장 큰 기여를 한 것 같습니다. "이해력을 가장 닮고 싶은 팀원."|
|이준규*|피그마 작업 때 혜영님의 부재로 모든 팀원들이 의욕을 잃어가고 있었다. 너무 어렵고 막막해서 포기하고 싶었던 순간 팀원들을 붙잡아 준 사람이 민종님이다. 안 돼. 어려워 하고 포기하는 것이 아니라 일단 시도해보고 노력하는 자세가 너무 멋있다. 이번 프론트엔드 프로젝트는 수업 때 배운 내용을 제대로 복습하고 체화할 시간이 부족했기에 AI의 도움을 받는 것이 당연했다. 그러나 민종님이 AI를 사용하는 방식을 보고 좀 놀랐다. 나는 시간에 쫓겨 로직에 대한 의문을 크게 갖지 않았는데 민종님은 AI의 답변을 자세하게 읽어보고 생각하고 응용하고 있었다. 노력하는 천재다. 백엔드와 연동도 멋있게 시켜줘서 발표 때 부족한 부분을 채울 수 있게 되었다. 너무너무 감사하다.
|
|김성민|SQL DDL, 더미 데이터를 쌓고 회원가입 로그인 구현을 하는 등 어려울 수도 있는 작업에서 불평불만 없이 작업을 묵묵하고 빠르게 잘 해주셨습니다. 프로그래밍적으로 뛰어난 사고를 가지고 있고 자신이 어떻게 하면 팀에 도움이 될까 생각을 하여 자신이 할 일을 알아서 찾아서 해주는 아주 고마운 사람입니다.|
