

# be14-3rd-Tuna-GoMen
❤️이혜영 🩷김성민 🧡이준규 💛서민종 🖤한석현
<img src="https://github.com/user-attachments/assets/9fe1378f-eec1-4d9f-8ece-cf6b387bc336" width="500" />
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
 이 플랫폼은 개발자를 준비하는 학생 및 준비생들을 위한 **멘토링 기반 커뮤니티 웹사이트**입니다.
사용자는 실제 경력을 가진 멘토 혹은 GitHub 등 포트폴리오로 검증된 멘토와 1:1 또는 팀 단위 멘토링을 받을 수 있으며, 다른 사용자들과 함께 프로젝트 팀을 구성하거나 개발 관련 정보를 공유함으로써 실무 감각과 협업 능력을 함께 키울 수 있습니다.

 **메인페이지**는 로그인/회원가입 이후 진입하는 페이지로 멘토링이 주요 기능인 사이트의 주요 목적을 강조하기 위해 바로 위에 인기 멘토들을 보여주고 멘토리스트로 바로가는 버튼을 만들어서 사용자친화적이게 만들었습니다. 또한 홍보를 위해서 배너를 아래에 만들고 그 아래에는 자유게시판과 팀모집게시판을 최신순으로 불러오게 만들었습니다.

**자유게시판**은 Q&A, 장비추천, 잡담 세가지 카테고리이며 게시글 작성시 최신순으로 정렬되고, 작성자 본인은 해당 게시글 수정 삭제 역시 가능합니다. 게시글 작성자가 아니라면 신고버튼만 보입니다. 댓글도 같은 흐름으로 등록 수정 삭제가 모두 가능하고 대댓글도 달 수 있습니다.  

이 **관리자 시스템**은 운영자가 **멘토 요청**, **신고 관리**, **칭호 부여** 등 다양한 사용자 관련 업무를 효율적으로 처리할 수 있도록 구성되어 있습니다. 전체적인 흐름은 로그인 후 관리자 대시보드에서 각 기능별 화면으로 진입하여 데이터를 확인하고, 처리 및 관리를 할 수 있도록 설계되어 있습니다.

우선, 회원 마이페이지 구현을 통해 회원이 자신의 회원 정보를 조회할 수 있고, 정보 수정이나 본인의 개성을 나타낼 수 있도록 프로필 사진을 변경할 수 있습니다.
또한, 자신의 개발자로서의 역량의 지표가 될 경력을 여러 개 추가 및 삭제할 수 있습니다.
멘토로서 멘토링 활동을 하고 싶은 회원을 위해 멘토 신청 기능을 구현하였고, 관리자는 회원의 경력 항목을 보고 직접 판단하여 회원의 멘토 여부를 결정함으로써 멘토로서의 신뢰도를 보장하게끔 구성하였습니다.

그리고, 쪽지 페이지에서는 자신이 대화를 나눈 회원들의 쪽지를 회원 별로 분류하여 날짜순으로 표시하였습니다. 회원은 다른 회원의 닉네임을 입력하여 그 회원에게 쪽지를 주고 받을 수 있으며 커뮤니티에서 게시글/댓글로 소통할 때는 한계가 있지만 이런 쪽지 기능을 통해 여러 회원과 더 다양하고 활발하게 소통할 수 있습니다.

**관리자**는 먼저 로그인 후 관리자 전용 **메인 페이지**에 진입합니다. 이곳에서는 전체 시스템 관리 기능의 진입점 역할을 하는 버튼들이 제공되며, **‘멘토 요청 관리’**, **‘신고 관리’**, **‘칭호 관리’** 등의 페이지로 이동할 수 있습니다. 각각의 버튼은 floating-back 스타일로 우측 하단에 고정되어 있어 사용자가 어느 위치에서든 쉽게 홈으로 돌아갈 수 있도록 합니다.

**‘멘토 요청 관리’** 페이지에서는 일반 사용자들이 신청한 멘토 승급 요청 목록이 표시됩니다. 각 요청 항목은 신청자의 닉네임과 함께 ‘수락’ 또는 ‘거절’ 버튼으로 구성되어 있으며, 관리자가 수락 버튼을 클릭할 경우 해당 유저는 멘토 권한(isMentor: 'Y')이 부여됩니다. 처리된 요청은 즉시 화면에 '처리 완료'로 변경되어, 관리자가 어떤 요청을 이미 처리했는지 명확히 알 수 있도록 합니다.

이후 관리자는 **신고 처리**를 위해 **‘신고 관리’** 페이지로 이동할 수 있습니다. 이 화면에서는 사용자가 작성한 게시글이나 댓글에 대해 들어온 신고 목록이 테이블 형식으로 정리되어 있으며, 각 항목은 신고 대상(게시글/댓글 ID), 신고자 ID, 신고 사유, 처리 상태 등으로 구성됩니다. 신고 사유는 **‘신고사유 보기’** 버튼을 통해 모달 창으로 확인할 수 있으며, 관리자에게는 벌점 사유를 선택할 수 있는 드롭다운 메뉴와 ‘처리’ 버튼이 함께 제공됩니다. 벌점이 부과되면 해당 유저의 violationScore가 누적되며, 누적 점수가 100점을 초과할 경우 자동으로 탈퇴 처리(isQuitted: 'Y')가 진행됩니다. 또한 게시글이나 댓글이 문제될 경우 블라인드 처리 버튼을 통해 콘텐츠를 숨길 수 있습니다.

관리자는 이어서 **칭호를 관리**하기 위해 **‘칭호 관리’** 페이지로 진입합니다. 이 페이지에서는 시스템 내에서 사용자들에게 부여되는 칭호들을 추가하거나 삭제할 수 있으며, 칭호명과 달성 조건이 리스트 형태로 제공됩니다. ‘추가하기’ 버튼을 클릭하면 입력 폼이 나타나고, 새 칭호 정보를 입력 후 저장하면 리스트에 바로 반영됩니다. 필요 시 각 칭호 옆에 있는 ➖ 버튼을 눌러 삭제도 간편하게 할 수 있어, 관리자가 칭호 정책을 유동적으로 운영할 수 있습니다.

전체적으로 이 시스템은 관리자들이 데이터 확인과 처리를 빠르게 할 수 있도록 최소한의 클릭만으로 원하는 기능에 접근할 수 있도록 구성되어 있으며, 사용자 요청, 신고, 역할 변화 등의 흐름을 자연스럽게 이어주는 구조로 되어 있습니다. 모든 기능은 Vue 3 Composition API와 Axios 기반으로 구성되어 있으며, 화면 전환 없이 실시간 상태 반영이 가능하도록 UX 설계가 되어 있습니다.

시스템 확장이나 추가 기능 도입 시에도 현재 구조를 기반으로 페이지를 추가하거나 API를 연동하는 방식으로 손쉽게 대응할 수 있어 확장성 또한 우수합니다. 필요한 경우 통계 대시보드, 알림 설정, 관리자별 로그 기능 등을 통해 더욱 전문적인 시스템으로 발전시킬 수 있습니다.

**멘토 리스트 페이지**는 전체 멘토 게시글을 한눈에 확인할 수 있도록 구성되어 있습니다. 각 멘토 카드는 기술 스택, 멘토링 성격, 간략한 소개가 표시되며, 사용자는 원하는 멘토의 "신청하기" 버튼을 클릭해 상세 내용을 확인할 수 있습니다.
멘토 상세 페이지에서는 멘토가 직접 작성한 기술 소개, 멘토링 조건 등을 상세하게 확인할 수 있으며, 팀장이 신청 버튼을 눌러 팀 단위로 멘토링을 요청할 수 있습니다. 신청 후에는 관리자가 등록 여부를 판단하거나, 멘토가 직접 수락하여 멘토링 공간이 생성됩니다.
멘토링 공간이 자동 생성됩니다. 이 공간은 멘토 1명과 멘티 팀이 함께 사용하는 단위이며, 역할에 따라 화면이 분기됩니다:

멘토는 멘토 화면의 **멘토링 공간**으로 진입하며, 팀원들의 정보를 확인하고, 질문 목록을 열람하거나 연장 요청을 처리할 수 있습니다.
멘티는 멘티 화면의 **멘토링 공간**으로 진입하며, 멘토 카드와 팀원 목록, 남은 질문 횟수 등을 확인할 수 있고, 질문 더보기를 통해 Q&A 화면으로 이동할 수 있습니다.
멘토링 공간 내에서는 실질적인 커뮤니케이션 기능이 구현되어 있습니다. 특히 질문 작성과 답변 시스템은 잔여 질문 횟수 제한을 두어 멘토의 부담을 줄이면서도 멘티가 중요한 질문을 신중히 작성할 수 있도록 설계되었습니다.

질문과 답변은 각각의 멘토링 공간 내에서 팀 단위로 공유됩니다. 멘토와 멘티 모두 **Q&A** 전체보기 페이지에서 현재까지 등록된 질문들을 테이블 형태로 확인할 수 있으며, 질문을 클릭하면 상세 내용을 열람할 수 있습니다. 멘토는 질문 작성자의 정보를 함께 확인할 수 있어, 보다 개인화된 피드백이 가능합니다. 멘티는 남은 질문 횟수가 0이 될 경우 질문 연장 요청을 보낼 수 있으며, 멘토는 이를 수락하거나 거절할 수 있습니다. 수락 시 질문 횟수가 초기화되고, 거절 시 멘토링 공간이 종료되는 구조로 운영됩니다. 이 흐름은 실제 교육 현장에서의 계약 기반 멘토링처럼 유사하게 작동되며, 실무 시뮬레이션에 가깝도록 구성되었습니다.



## 📜 3. 기능명세서
### 3-1. WBS
[WBS 링크](https://docs.google.com/spreadsheets/d/19VZI_1LJ8Jx2r8srhHZ5M0GApO66an1NkPZsmz7pS5Y/edit?gid=1013678623#gid=1013678623)
![image](https://github.com/user-attachments/assets/a53d6ee0-8df2-44a4-b11f-a0cd708854c3)

### 3-2. 요구사항 명세서
[요구사항 명세서 링크](https://docs.google.com/spreadsheets/d/19VZI_1LJ8Jx2r8srhHZ5M0GApO66an1NkPZsmz7pS5Y/edit?gid=0#gid=0)

![image](https://github.com/user-attachments/assets/8e653510-e6ef-4c2e-927d-ec7bceee39c6)


## ✍🏻 4. 테스트 계획 및 결과보고서
### 4-1. Main Page & Start Page

<details><summary> 메인 페이지  </summary>
<img src="https://github.com/user-attachments/assets/9a83b4a1-77d1-498e-a3ee-3b69f9a326e7" width="500" />
</details>

<details><summary> 시작 페이지 </summary>
      <img src="https://github.com/user-attachments/assets/bff787fc-3d34-4cc0-bba0-49c1c7a61737" width="500">
</details>

### 4-2. Login & SignUp Page
<details><summary> 회원 가입 </summary>
   <img src="https://github.com/user-attachments/assets/0045a0fb-b11d-4133-8687-da9cd81c3846" width="500">
</details>

<details><summary> 로그인 </summary>
   <img src="https://github.com/user-attachments/assets/ca84cb83-a2c1-40b8-ba7a-2d567754e720" width="500">
</details> 

<details><summary> 벌점100점 탈퇴처리 </summary>
   <img src="https://github.com/user-attachments/assets/22a67351-2cbc-40bb-8fcf-b3e1c1899ae7" width="500">
</details> 

### 4-3. MyPage
<details><summary> 내 정보 페이지 </summary>
   <img src="https://github.com/user-attachments/assets/18a850ff-995f-47be-bcfd-b43fe396f7e0" width="500">
</details>

<details><summary> 내 정보 수정 </summary>
   <img src="https://github.com/user-attachments/assets/e302dc79-4180-40ee-a3e2-9b72a4d90c5f" width="500">
</details>

<details><summary> 프로필 사진 변경 </summary>
   <img src="https://github.com/user-attachments/assets/68d04479-e7c7-4335-add2-9f030267e238" width="500">
</details>

<details><summary> 비밀번호 변경 </summary>
   <img src="https://github.com/user-attachments/assets/c897f734-dbec-4382-bdd9-236001dc6e2b" width="500">
</details>

<details><summary> 경력 추가 </summary>
   <img src="https://github.com/user-attachments/assets/30923ed1-ef46-491f-a8e5-e4087a5a3a0e" width="500">
</details>

<details><summary> 경력 삭제 </summary>
   <img src="https://github.com/user-attachments/assets/213a39c5-ccea-42cc-bff0-ee71308ab881" width="500">
</details>

<details><summary> 멘토 신청 </summary>
   <img src="https://github.com/user-attachments/assets/809dcf1b-664b-4542-9e15-c2871f7d4c01" width="500">
</details>

### 4-4. Message
<details><summary> 쪽지함 </summary>
   <img src="https://github.com/user-attachments/assets/8ba0f469-9eb6-4a2f-9bd1-0ec84335c07c" width="500">
</details>

<details><summary> 쪽지 전송 </summary>
   <img src="https://github.com/user-attachments/assets/983d331d-6b19-4ffe-9896-31ec44c46508" width="500">
</details>

### 4-5. Free Boards

<details><summary> 게시글 조회 </summary>
      <img src="https://github.com/user-attachments/assets/dd25ea85-6153-4b5a-96a8-c8179f4805bd" width="500">
</details>
<details><summary> 게시글 작성 </summary>
      <img src="https://github.com/user-attachments/assets/ff04781e-8e4a-4260-b032-1a44c1ae2b0b" width="500">
</details>
<details><summary> 게시글 수정 </summary>
      <img src="https://github.com/user-attachments/assets/b8466a4e-2f75-490b-a4cc-5f340b2db25f" width="500">
</details>
<details><summary> 자유 게시판 </summary>
      <img src="https://github.com/user-attachments/assets/b8d82c13-3172-41e6-8588-a8694659112c" width="500">
</details>
<details><summary> 게시글 블라인드 처리 </summary>
<img src="https://github.com/user-attachments/assets/ee9ecd91-f290-4a88-84b7-ccb9f768f40b" width="500">
</details> 

### 4-6. Team Reacruit Boards
<details><summary> 팀 모집 게시글 생성 </summary>
<img src="https://github.com/user-attachments/assets/e7acf2b4-b303-45cd-8412-bb9c7a4247a0" width="500">
</details>

<details><summary> 팀 모집 게시글 삭제 </summary>
<img src="https://github.com/user-attachments/assets/b867222d-291b-4a7c-9505-f76057313ee0" width="500">
</details>

<details><summary> 로그인 해야 팀 신청 및 글 작성 가능 </summary>
<img src="https://github.com/user-attachments/assets/b035c7c8-fee3-4189-bf50-9ea0ba4cde31" width="500">
</details>

<details><summary> 예시 </summary>

</details>

<details><summary> 예시 </summary>

</details>

<details><summary> 예시 </summary>

</details>

<details><summary> 예시 </summary>

</details>

<details><summary> 예시 </summary>

</details>


<img src="https://github.com/user-attachments/assets/46e1a577-3446-45f7-89bc-ce9cfecb53a9" width="500">
<img src="https://github.com/user-attachments/assets/9984e0ca-685f-477f-8956-c03370a94614" width="500">
<img src="https://github.com/user-attachments/assets/f6744ae5-0e70-43ec-ab1a-b6519bacb8e9" width="500">
<img src="https://github.com/user-attachments/assets/fa8f9a7e-a11a-4faa-9737-f15d5b994120" width="500">


<img src="https://github.com/user-attachments/assets/7b62b24a-9147-4de9-a2c8-0ba62a5c73a4" width="500">
<img src="https://github.com/user-attachments/assets/6e019428-72be-4d39-957b-10c3ad598d66" width="500">
<img src="https://github.com/user-attachments/assets/7438e117-0e51-4b0d-b0ea-c92290b93f82" width="500">

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
|한석현*|혜영님은 팀 내에서 항상 세심하고 책임감 있는 자세로 업무에 임해주셨습니다. 맡은 업무는 철저하게 계획하고, 마감 기한을 잘 지키는 점이 인상 깊었습니다. 먼저다른 팀원이 어려움을 겪고 있을 때 먼저 나서서 도와주는 협업 능력도 뛰어났습니다. 꼼꼼함이 필요한 문서 작업이나 테스트 업무에서 강점을 보여주셨고, 팀 전체의 완성도를 높이는 데 기여하셨습니다. 백앤드 프로젝트에서도 느꼈지만 뛰어난 프로그래밍 능력으로 무사히 프로젝트를 끝내는데 큰 기여를 하였습니다. 같은 팀이었을때 큰 힘이 되었습니다.|
|이준규*|백엔드 프로젝트에서도 너무 훌륭한 팀원이었지만 프론트엔드 프로젝트에서는 그저 ‘빛’ 이었다. 디자인적인 재능이 많이 부족한 팀원들에게 너무나 소중한 존재였다. figma작업을 너무 훌륭하게 해주었기에 다른 팀원들이 figma를 바탕으로 각자 맡은 도메인을 완성할 수 있었고 공통으로 사용되는 components를 프로젝트 시작과 동시에 누구도 부탁하지 않았음에도 직접 만들어서 pr을 올려놓은 것 덕분에 페이지를 구성하는 것이 너무 편했다. 팀내에서 너무나 의지되고 힘이 되는 존재였다.  이것이 우리가 혜영님을  대장님이라고 부르는 이유다. 개발자를 준비하는 입장에서 디자인, PPT 작성에 시간 투자하는 것 보다 개발하는 것에 욕심이 생길 수 있음에도 부족한 팀원들을 대신하여 잘 만들어 주었기에 양질의 발표자료가 나온 것 같다. 정말 감사한 팀원이다.|
|김성민|가장 나이가 어리심에도 불구하고 우리팀의 대장님이자 기둥으로 우리팀을 잘 이끌어 주셔서 감사합니다. 제가 열심히 만든 메인 페이지를 지웠을 때는 눈물이 찔끔 나왔지만 그럼에도 혜영님이 만드신 디자인이 더 이쁘다는 걸 인정할 수 밖에 없었습니다. 이 미적감각이 없는 우리팀을 위해 고생해주셔서 감사합니다. 그리고 발표 전날에도 제가 시간 내에 할 일을 다 못 할 거 같으니 먼저 나서서 도와주 셔서 감사합니다. 혜영님 덕분에 이 프로젝트를 무사히 끝낼 수 있었습니다. |
|서민종⭐|백엔드 프로젝트에 이어 프론트엔드 프로젝트를 진행하면서 생각한 점이 기능보다 더 까다롭고 창의력이 필요한 부분이 디자인이라고 생각했습니다. 초기 피그마 모델 구현부터 다른 팀원들이랑 같이 작업하면서 많이 헤맸는데 이 때 전체 디자인과 테마를 잘 구성해주셨고 프로젝트의 방향을 잘 잡아주셨습니다. 그 덕분에 저를 포함한 다른 팀원들이 잘 따라갈 수 있었고, 서비스의 질이 향상될 수 있었던 것 같습니다. 미적 감각에 탁월하고 센스가 있어서 많은 도움을 받았습니다.|

|한석현|peer review |
|:---:|-|
|이혜영*|석현님 덕분에 프로젝트가 길어지면서 생길 수 있었던 팀원들의 피로감이나 긴장감이 자연스럽게 풀렸던 것 같아요. 늘 밝은 에너지로 팀의 분위기를 잘 이끌어주셔서 정말 감사했습니다. 그리고 발표 때도 정말 야무지고 자신감 있는 모습이 인상 깊었어요. 석현님 덕분에 저희 발표가 훨씬 더 깔끔하고 설득력 있게 마무리될 수 있었던 것 같습니다. 특히 관리자 페이지 구현에서 멘토 요청 관리, 신고 처리 등 다른 페이지들과 연동되는 복잡한 기능들을 맡아주시면서도 전체적인 구조를 이해하고 잘 반영해주신 점이 대단했습니다. 다양한 코드 흐름을 읽고 조율해야 하는 번거로움이 있었을 텐데도 세심하게 구현해주신 부분에서 석현님의 집중력과 책임감을 느낄 수 있었습니다.|
|이준규*|개발, 분위기 메이킹, 발표 모든 것을 담당한 소중한 팀원이다. 전날 밤까지도 팀원들이 기능 개발을 완벽하게 끝내지 못 해서 불안하고 힘들었을 텐데 그 안에서 본인이 할 수 있는 최선의 것들을 해줘서 너무 고맙다. 팀원들의 사소한 말에도 항상 귀 기울이고 대답해주는 자세 또한 본 받을만하다.  이번 프로젝트에서 팀원들이 db.json 파일과 index.js 파일을 공유했기에 한 명의 pr을 받을 때마다 충돌을 해결해야 했다. 귀찮고 번거로운 일임에도 팀원들의 pr을 제일 많이 받아줬다. 협업에 있어서 정말 중요한 자세라고 생각한다. 나 하나가 아닌 팀을 생각하는 마인드가 기본적으로 깔려 있어야 이런 태도들이 나온다고 생각한다. 이 프로젝트를 마지막으로 팀원이 바뀐다. 나에게 먼저 같이 팀하자고 손 내밀어준 석현님에게 너무 감사하고 행복한 팀이었다고 전해주고 싶다.|
|김성민|석현님은 항상 유쾌한 유머로 우리팀의 분위기를 밝게 해주고 그리고 일적인 부분에서도 자신의 파트를 빠르고 정확하게 해내는 모습이 너무 보기 좋았습니다. 석현님이 있어서 지난 백엔드 프로젝트 때부터 재밌게 지낼 수 있었습니다. 
 |
|서민종(별)|팀 내 분위기 메이커로서 많은 존재감을 가진 팀원이었습니다. 프로젝트 진행할 때의 분위기와 팀원간의 연결다리 역할 부분에서 최고로 기여를 많이 해주셨습니다. 또한, 카테고리별 신고 로직을 구성하여 회원 탈퇴까지 이어지는 서비스 흐름을 파악하고 잘 구현해 주셨습니다. 발표 전날에는 발표자료 준비를 위한 사전 더미데이터 세팅과 발표 흐름을 위한 전체 시나리오를 적절히 구성해주셔서 훌륭한 발표를 만들어낼 수 있었던 것 같습니다.|

|이준규|peer review |
|:---:|-|
|이혜영*|저번 프로젝트에 이어 이번에도 함께하게 되어 정말 든든했습니다. 무엇보다도 제가 구현에 어려움을 겪거나 고민할 때마다 배려해주시는 태도가 정말 감사했어요. 특히 팀 모집 게시판 구현에서 보여주신 디테일은 인상적이었습니다. 팀 신청자와 팀 모집자 간의 UI를 명확하게 구분해 표현한 점, 로그아웃 상태에서는 신청 버튼을 비활성화시키는 등의 세세한 UX 고려는 준규님이 얼마나 사용자 입장에서 생각하며 개발하는지를 잘 보여주는 부분이었습니다.또한 리뷰 페이지도 도맡아주셔서, 발표 직전까지 별점 데이터를 JSON 서버에 반영되도록 수정하고, 평균 별점까지 갱신되게 만들어 퀄리티를 한층 높여주셨습니다. 이 과정에서 마지막까지 최선을 다해주신 모습이 정말 인상 깊었어요. 그리고 PR 리뷰도 항상 빠르게 확인해주시고 피드백을 반영해주셔서, 전체 개발 흐름을 원활하게 이어갈 수 있었습니다.|
|한석현*|준규님은 팀의 분위기를 부드럽게 만드는 동시에, 논리적 사고력과 문제 해결 능력이 뛰어난 동료입니다. 개발 중 발생한 이슈에 대해 빠르게 원인을 분석하고, 대안을 제시하는 과정이 매끄러웠습니다. 특히 코드 리뷰 시 꼼꼼하면서도 피드백을 부드럽게 전달해 주셔서 팀 내 기술 공유에도 큰 도움이 되었습니다. 소통력과 유연성 면에서도 매우 좋은 인상을 받았습니다. 또한 누구보다 큰 장점인 책임감을 통해 프로젝트를 무사히 끝내는데 큰 기여를 하였습니다! 백앤드프로젝트와 프론트앤드 프로젝트까지 진행하며 심적으로 가장 많이 의지하고 생활했습니다 정말 감사했습니다|
|김성민|준규님은 비전공자임에도 불구하고 맡은 부분에서 끊임없는 자기 스스로 피드백을 하고 분석을 하여 더 나은 방향으로 이끌고 높은 수준의 이해도를 가지려고 노력을 많이 하십니다. 자신이 맡은 부분을 기능적으로 완성을 하여도 끊임없이 고칠 부분이 없는지 고민하시고 프로젝트에 많은 시간을 투자하여 덕분에 수준 높은 프로젝트를 완성할 수 있었습니다. |
|서민종(star)|프론트엔드 프로젝트를 접하면서 처음에 많이 힘들어하신 것 같습니다. 하지만 포기하지 않고 계속 시도하면서 어떻게든 문제를 해결하려는 자세에 인상을 깊이 받았습니다. 팀 모집 게시판과 별점 리뷰 페이지를 구현하면서 복잡한 테이블 구조와 테이블 간의 로직을 구현하는 난이도가 어려운데도 훌륭히 구현해 주셨습니다. 또한, 서비스 구현의 과정에서도 끊임없이 전체 모델링 구조에 대해서 고민하고 개선하려는 노력을 많이 해 주신 덕분에 전체 모델 구조가 더 안정적으로 완성될 수 있었다고 생각합니다.|

|김성민|peer review |
|:---:|-|
|이혜영*|성민님은 이번 프로젝트의 핵심이라고 생각합니다. 멘토링 기능이라는 가장 중요한 파트를 책임감 있게 맡아 끝까지 완성해주신 점이 정말 대단했습니다. 특히 멘토링 요청부터 수락, 별점까지 이어지는 전반적인 흐름을 구현하면서 세세한 오류 처리나 예외 케이스까지도 꼼꼼히 챙겨주셔서 기능의 완성도가 훨씬 높아졌어요. 발표 전날까지도 묵묵히 계속 디버깅하고 최적화 작업을 해주시던 모습이 아직도 기억에 남습니다. 게다가 깃허브 관리도 항상 중심을 잘 잡아주셔서 협업이 훨씬 수월했습니다. 충돌 관리나 PR 머지 타이밍 조절도 잘 해주셔서 전체적인 코드 흐름이 끊기지 않았던 것 같아요. 보이지 않는 곳에서 가장 많이 고생해주신 진정한 1등 공신이라고 생각합니다. 항상 감사하고, 함께 작업할 수 있어서 정말 좋았습니다.|
|한석현*|성민님은 팀 내에서 기술적 중심축 역할을 해주신 분으로, 프로젝트 초반 설계 단계부터 이번 프론트앤드 구현에 이르게까지 전체 흐름을 깊이 이해하고 적극적으로 이끌어 주셨습니다. 특히 멘토링과 같은 복잡한 기능 구현에서 빠른 판단력을 보여주셨고, 문제 발생 시 책임감 있게 끝까지 해결하려는 태도가 인상 깊었습니다.또한 협업 시에도 충돌 해결이나 커밋을 관리해주어 다른 팀원들이 업무를 이어받기 편하게 해주는 배려심도 갖추고 있었습니다. 기술적 전문성과 팀워크를 함께 갖춘 동료로서, 앞으로도 함께 일하고 싶은 개발자입니다.|
|이준규*|멘토링 커뮤니티에서 멘토링을 맡아 백엔드부터 프론트엔드까지 남들보다 두 배 가까이 되는 양을 고민하고 작업해야 했다. 그럼에도 힘든 내색 없이 너무 열심히 임해줘서 감사하다. 프론트엔드는 물리적으로 시간이 너무 부족했기에 양이 많고 복잡한 구조를 담당한 멘토링이 당일 새벽이 되어서야 완성되었지만 나를 포함한 그 어떤 팀원도 그를 원망하지 않고 도와줬던 이유는 그동안 성민님이 어떤 자세로 프로젝트를 임했는지 알기 때문이라 생각한다. 알고있는 지식이 많음에도 다른 팀원이 작업한 것 중 이상한 점이 발견되었을 때 항상 질문을 하는 태도는 너무나 본받을 태도인 것 같다. 팀 프로젝트에 있어서 실력보다 중요한 것이 있다면 바로 이런 성민님의 태도이지 않을까 생각된다.|
|서민종★|가장 구현하기 까다로운 멘토링 페이지를 맡아서 훌륭하게 구현해 주셨습니다. 디자인도 어렵고 기능 로직도 복잡하게 구성되어 있어서 충분히 힘들 법도 한데 내색 없이 묵묵히 자신의 일에 최선을 다 해 주셨습니다. 또한, 바쁜 와중에도 다른 팀원들의 개발 툴에서 발생하는 오류나 충돌도 해결해 주면서 팀 프로젝트에 큰 도움을 주셨습니다. 심지어 발표 전 날까지도 밤을 새 가면서 프로젝트의 완성도를 위해 열심히 노력하신 점이 너무 멋있고 본 받을 점이라고 생각했습니다.|

|서민종|peer review |
|:---:|-|
|이혜영*|민종님은 ‘배우는 속도가 빠르다’는 말이 어울리는 분이셨습니다. 프로젝트 초반 Figma 디자인을 다루실 때에는 감을 조금 잡는 데 시간이 걸렸지만, 금세 적응하셔서 훌륭한 결과물을 만들어내셔서 깜짝 놀랐습니다. UI/UX적인 감각도 점점 더 좋아지셔서 마이페이지나 쪽지 기능 구현에서도 유저 친화적인 요소가 잘 드러났던 것 같아요.특히 로그인 부분에서는 유레카 서버와의 연동도 하시고, 실제로 잘 연결해내신 점이 인상 깊었습니다. 발표에서 마이페이지나 쪽지 기능이 충분히 부각되지 못해 아쉬웠을 수도 있겠지만, 그만큼 깊이 있게 잘 구현해주신 걸 저는 알고 있어서 정말 감사한 마음입니다. PR도 항상 빠르게 리뷰해주시고, 피드백도 반영 속도가 굉장히 빨라서 협업 과정이 매우 수월했습니다. 배울 점이 많은 개발자라고 생각합니다|
|한석현*|민종님은 꾸준함과 성실함이 돋보이는 팀원으로, 반복되는 작업이나 복잡한 로직 구현에서도 묵묵히 집중력 있게 일하는 스타일입니다. 아이디어 회의나 리뷰 때는 날카롭고 실용적인 의견을 잘 내주셨습니다. 코드 품질에도 늘 신경 쓰며, 뛰어난 프로그래밍적 사고로 어려움에 봉착한 다른 팀원의 문제도 해결하며 프로젝트를 완수하는데 큰 기여를 하였습니다 장기적으로도 믿고 함께할 수 있는 동료입니다. 지난 프로젝트팀에서도 함께하며 이번이 두번째 팀이었는데 항상 어느팀에서든 큰 역할과 문제해결에 많은 도움이 돼왔습니다 민종이형 땡큐 >,.<|
|이준규*|피그마 작업 때 혜영님의 부재로 모든 팀원들이 의욕을 잃어가고 있었다. 너무 어렵고 막막해서 포기하고 싶었던 순간 팀원들을 붙잡아 준 사람이 민종님이다. 안 돼. 어려워 하고 포기하는 것이 아니라 일단 시도해보고 노력하는 자세가 너무 멋있다. 이번 프론트엔드 프로젝트는 수업 때 배운 내용을 제대로 복습하고 체화할 시간이 부족했기에 AI의 도움을 받는 것이 당연했다. 그러나 민종님이 AI를 사용하는 방식을 보고 좀 놀랐다. 나는 시간에 쫓겨 로직에 대한 의문을 크게 갖지 않았는데 민종님은 AI의 답변을 자세하게 읽어보고 생각하고 응용하고 있었다. 노력하는 천재다. 백엔드와 연동도 멋있게 시켜줘서 발표 때 부족한 부분을 채울 수 있게 되었다. 너무너무 감사하다.|
|김성민|민종님은 저번 백엔드 때부터 작업하기 어려운 부분을 도맡아 해주셔서 감사합니다. 힘든 작업 임에도 불구 하고 착착 해내는 모습을 보고 이 사람은 진짜 대단하다고 느꼈습니다. 항상 피드백을 해주면 그에 대해서 빠르게 분석하고 그 것을 반영하는 모습에 놀랐습니다. |
