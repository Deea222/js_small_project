## 로그인 폼

간단한 형식의 로그인 화면을 구현하였다.

## Project Specifications

- HTML, CSS 통한 화면 구현
- checkRequired(): input값의 입력 여부를 확인
- checkLength(): 입력값의 최소/최대 길이를 확인
- checkEmail(): email의 형식을 지켰는지 확인
- checkPasswordsMatch(): 비밀번호의 입력값이 일치하는지 확인

## 아쉬운 점

- 원래 강의에서는 username, email, password, password2를 배열에 넣어 checkRequired()를 확인하였다
  그러나 이 방식의 경우, 모든 항목이 checkRequired()를 만족해야 다음 조건을 확인할 수 있었다

- 따라서 배열을 분리하여, 항목별로 조건문을 만들어 구분하였다.
  그러나 이 방식은 똑같은 함수명을 중복적으로 사용한다는 점에서 아쉽다.
