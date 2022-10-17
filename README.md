# 400JA_DIARY

## 기획
하루 400자, 가볍게 일기를 쓰는 웹 어플리케이션입니다.   
다양한 일기 웹/ 앱이 있지만 있는걸 그냥 사용하는 것 보다는 직접 만들어 보면서 필요한 기능을 구현하자는 생각에 기획하게 되었습니다.
처음에는 단순한 기능만 넣어서 개발할 생각이며 이는 새로운 기술 스택이 여러개 추가되는데 괜히 처음부터 대규모로 만들면 오류만 커진다고 판단했기 때문입니다.

### 프론트엔드 중점
* 소셜로그인 구현
* 리액트를 이용한 SPA 구현

## 프론트엔드 기술 스택
* React
* Axios
  * 기본적으로 탑재된 fetch보다는 느리지만, 비동기의 특성상 확연한 차이는 없을 것이라 생각했기 때문에 쉽고 읽기 편한 점을 살리기 위해 선택했습니다.
* TailwindCSS
  * 규격화된 CSS를 이용해서 생산성을 높이기 위해 선택했습니다.

## 페이지 구성
* 로그인 페이지
  * 일반 회원가입, Oauth(네이버, 구글, 카카오) 
  * 비밀번호 분실시 임시비밀번호 발급
* 메인페이지
  * 일기 생성 - 제목 입력과 본문 입력으로 구성. 당일에 이미 작성한 일기가 있다면 일기를 업데이트
  * 일기 모아보기 - 최신 날짜를 기준으로 역순. 무한스크롤 기능
  * 일기 검색 - 키워드(단어) 검색과 날짜 기준 검색
* 마이페이지
  * 공통 - 등록된 이메일, 회원탈퇴, 일기 총 작성 횟수
  * 일반회원 - 비밀번호 변경 가능
  * 소셜로그인 - 비밀번호 변경 불가
* 헤더 바 - 메인페이지, 마이페이지, 로그아웃

