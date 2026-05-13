# 📚 미니 도서 대출 시스템 (과제)

**작성자:** 박수현
**작성일:** 2026년 5월 13일

## 1. 시스템 소개
본 프로젝트는 React(Vite)를 활용하여 구현한 웹 기반의 **미니 도서 대출 시스템**입니다. 복잡한 백엔드 서버 없이 프론트엔드 상태(State) 관리를 통해 도서의 대출 및 반납 프로세스를 직관적으로 시뮬레이션할 수 있도록 설계되었습니다. 사용자는 깔끔한 UI를 통해 도서 목록을 확인하고, 원하는 책을 검색하며, 즉각적으로 대출 상태를 변경할 수 있습니다.

## 2. 주요 기능 소개
작성된 시스템은 다음과 같은 핵심 기능들을 제공합니다.

*   **실시간 도서 검색 기능:** 상단 검색바에 도서 제목이나 저자명을 입력하면, 별도의 새로고침 없이 즉시 일치하는 도서만 화면에 필터링되어 나타납니다.
*   **도서 상태 직관적 확인:** 각 도서 카드에는 출판 연도, 장르와 함께 현재 상태가 배지(Badge) 형태로 표시됩니다. 대출 가능 시 초록색('비치중'), 불가능 시 빨간색('대출중')으로 표시되어 가독성을 높였습니다.
*   **대출 및 반납 토글(Toggle) 기능:** 
    *   대출 가능한 도서의 **[대출하기]** 버튼을 누르면 상태가 '대출중'으로 변경되고 버튼이 **[반납하기]** 로 바뀝니다.
    *   다시 **[반납하기]** 버튼을 누르면 즉시 '비치중' 상태로 복구됩니다.
*   **반응형 UI 설계:** CSS Grid를 활용하여 화면 크기에 맞춰 도서 카드가 자연스럽게 정렬되도록 구현했습니다.

## 3. Github Actions CI/CD 환경 소개
본 프로젝트는 **GitHub Actions**와 **AWS S3**를 연동하여 소스 코드가 푸시(Push)될 때마다 자동으로 배포되는 CI/CD 환경을 구축했습니다.

1.  **트리거(Trigger):** 코드가 GitHub 레포지토리의 `main` 브랜치에 `push`되면 워크플로우가 자동으로 시작됩니다.
2.  **빌드(Build):** GitHub가 제공하는 가상 환경(Ubuntu)에서 Node.js 환경을 세팅하고, `npm ci`로 의존성을 설치한 뒤 `npm run build`를 실행하여 배포용 정적 파일(`dist` 폴더)을 생성합니다.
3.  **인증 및 배포(Deploy):** AWS Academy 환경의 특수성을 고려하여, GitHub Secrets에 안전하게 저장된 임시 자격 증명 키(`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_SESSION_TOKEN`)를 통해 인증을 거칩니다. 이후 AWS CLI를 활용하여 빌드된 `dist` 폴더의 내용을 지정된 AWS S3 버킷으로 동기화(`s3 sync`)합니다.

## 4. 서비스 접속 URL
AWS S3 정적 웹 사이트 호스팅을 통해 배포된 라이브 링크입니다. 
*(주의: AWS Academy 임시 세션 정책에 따라 아래 링크는 일정 시간(약 4시간) 이후 접속이 제한될 수 있습니다.)*

🔗 **AWS S3 URL:** [http://mybucket-20263578.s3-website-us-east-1.amazonaws.com/](http://mybucket-20263578.s3-website-us-east-1.amazonaws.com/)

## 5. 시연 영상 링크
GitHub Actions를 활용한 자동 배포 CI/CD 구축 과정과 도서 대출 시스템의 실제 작동 모습을 담은 시연 영상입니다.

🎥 **YouTube 링크:** [https://youtu.be/L69F4o1ayq4](https://youtu.be/L69F4o1ayq4)

---

## [과제 2] AWS Amplify 호스팅

### 6. AWS Amplify 배포 환경 소개
과제 1에서 구축한 GitHub 레포지토리를 **AWS Amplify** 서비스와 연동하여 추가적인 호스팅 환경을 구축했습니다. S3+GitHub Actions 조합과 달리, Amplify는 레포지토리 연결만으로 브랜치(main)에 코드가 Push 될 때마다 빌드와 배포를 자동으로 수행하는 강력하고 간편한 CI/CD 파이프라인을 제공합니다.

*   **배포 플랫폼:** AWS Amplify
*   **빌드 프레임워크:** React (Vite - 빌드 디렉토리: `dist`)
*   **트리거 방식:** GitHub `main` 브랜치 변경 사항 감지 시 자동 배포

### 7. Amplify 배포 URL
🔗 **AWS Amplify URL:** [https://main.d31zdqpe3rl16x.amplifyapp.com/](https://main.d31zdqpe3rl16x.amplifyapp.com/)

### 8. Amplify 자동 배포 시연 영상
코드를 수정하여 GitHub에 Push 한 뒤, AWS Amplify 콘솔에서 빌드 프로세스가 자동으로 실행되고 웹사이트가 업데이트되는 과정을 담은 시연 영상입니다.

🎥 **Amplify 유튜브 링크:** [https://youtu.be/QFYeftUNiGI](https://youtu.be/QFYeftUNiGI)