# SWith (Study-With)

> 실시간 협업 기능을 갖춘 온라인 스터디 플랫폼

[SWith 프론트엔드 배포 사이트](https://study-with-pjt.vercel.app/)

## 📌 프로젝트 소개

SWith는 WebSocket 기반 실시간 동기화를 통해 다중 사용자가 함께 공부할 수 있는 협업 학습 플랫폼입니다. 사용자는 스터디룸을 생성하여 친구들과 실시간으로 학습 시간을 공유하고, 일정을 관리하며, 채팅을 통해 소통할 수 있습니다.

### 주요 기능

- **실시간 협업 스터디룸** - WebSocket 기반 실시간 타이머 동기화 (500ms 브로드캐스트)
- **학습 시간 추적** - 일별/주간/월간 학습 통계 및 차트 시각화
- **일정 관리** - 드래그 앤 드롭 기반 직관적인 일정 관리 (4가지 상태: 대기중/진행중/완료/취소)
- **실시간 채팅** - WebSocket 기반 즉각적인 메시징 및 무한 스크롤
- **친구 시스템** - 친구 추가, 스터디룸 초대, 사용자 검색
- **JWT 인증** - Access/Refresh Token 이중 토큰 시스템

---

## 🛠 기술 스택

### Backend
![Node.js](https://img.shields.io/badge/Node.js-22.14.0-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-5.1.0-000000?logo=express&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-3178C6?logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-6.8.2-2D3748?logo=prisma&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?logo=mysql&logoColor=white)
![WebSocket](https://img.shields.io/badge/WebSocket-8.18.3-010101?logo=socket.io&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-9.0.2-000000?logo=jsonwebtokens&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-29.7.0-C21325?logo=jest&logoColor=white)

- **런타임**: Node.js 22.14.0
- **프레임워크**: Express.js 5.1.0
- **ORM**: Prisma 6.8.2
- **데이터베이스**: MySQL
- **실시간 통신**: WebSocket (ws 8.18.3)
- **인증**: JWT, Bcrypt
- **파일 업로드**: Multer
- **API 문서**: Swagger
- **테스팅**: Jest, Supertest

### Frontend
![Next.js](https://img.shields.io/badge/Next.js-15.2.4-000000?logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19.1.0-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.3-06B6D4?logo=tailwind-css&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-5.0.3-FF6B00?logo=zustand&logoColor=white)
![React Query](https://img.shields.io/badge/React_Query-5.74.4-FF4154?logo=react-query&logoColor=white)

- **프레임워크**: Next.js 15.2.4 (App Router)
- **라이브러리**: React 19.1.0
- **상태 관리**: Zustand 5.0.3, TanStack React Query 5.74.4
- **스타일링**: Tailwind CSS 4.1.3, MUI 7.0.2
- **HTTP 클라이언트**: Axios 1.8.4
- **드래그 앤 드롭**: @hello-pangea/dnd 18.0.1
- **차트**: Recharts 2.15.3
- **이미지 최적화**: Sharp 0.34.4

### DevOps
![Docker](https://img.shields.io/badge/Docker-latest-2496ED?logo=docker&logoColor=white)

- **컨테이너**: Docker (Multi-stage build)
- **베이스 이미지**: node:22-alpine

---

## 🏗 프로젝트 구조

```
Study-With-pjt/
├── backend/                      # Express.js API 서버
│   ├── src/
│   │   ├── controllers/         # 비즈니스 로직 (auth, user, room, schedule, friend, chat)
│   │   ├── services/            # WebSocket 타이머 서비스
│   │   ├── middlewares/         # 인증, 에러 핸들링, 파일 업로드
│   │   ├── routes/              # API 라우트 + Swagger 문서
│   │   ├── lib/                 # Prisma 클라이언트
│   │   ├── utils/               # 유틸리티 함수
│   │   └── types/               # TypeScript 타입 정의
│   ├── prisma/
│   │   ├── schema.prisma        # 데이터베이스 스키마
│   │   └── migrations/          # 마이그레이션 파일
│   └── index.ts                 # 서버 진입점 + WebSocket 서버
│
├── frontend/                     # Next.js 애플리케이션
│   ├── src/
│   │   ├── app/                 # Next.js App Router
│   │   ├── components/          # 재사용 가능한 컴포넌트
│   │   ├── stores/              # Zustand 스토어
│   │   ├── hooks/               # 커스텀 훅
│   │   ├── api/                 # Axios 인스턴스 및 API 함수
│   │   └── lib/                 # React Query 설정
│   ├── public/
│   │   ├── images/              # WebP 최적화 이미지
│   │   └── fonts/               # 폰트 파일
│   └── next.config.ts           # 번들 최적화 설정
│
└── README.md
```

---

## ✨ 상세 기능

### 랜딩페이지
<img width="1908" height="866" alt="랜딩" src="https://github.com/user-attachments/assets/70231ae4-a588-4dcb-8bf2-2dc508f8c8ef" />

- 모든 페이지 반응형 ui 구현

### 회원가입 페이지
<img width="671" height="891" alt="회원가입" src="https://github.com/user-attachments/assets/7f00588f-3557-42b7-9ca5-95e787ccece7" />

- 아이디, 닉네임, 비밀번호 입력해서 회원가입 가능
- 브라우저에서 로그인 한 전적이 있으면 자동 로그인
  
### 마이페이지
<img width="1895" height="894" alt="대시보드" src="https://github.com/user-attachments/assets/b4a514fb-a864-4146-9fdd-472ab52c791d" />
<img width="1572" height="863" alt="일정추가" src="https://github.com/user-attachments/assets/f7b393d0-688a-4e6f-a8c1-856513eccbd9" />
<img width="479" height="879" alt="반응형" src="https://github.com/user-attachments/assets/de359d8c-b7eb-48ac-82dd-31b575fd5367" />
<img width="841" height="517" alt="참여중인 방 입장" src="https://github.com/user-attachments/assets/e08dbfb7-740c-4786-a284-3e8aeb7ad94b" />

![드래그앤드롭](https://github.com/user-attachments/assets/0f3138f1-dda4-4e8e-a9ac-8dbaf4bd0f6c)
![상태변경](https://github.com/user-attachments/assets/0722ee35-90e6-4f7f-a2b1-b56b134377e0)

- 회원 정보 조회 가능
- 회원 정보 변경 가능(프로필사진, 닉네임)
- 주간, 월간, 총 누적 활동 시간 조회 가능
- 주간은 오늘이 속한 주인 7일단위, 월간은 오늘이 속한 달 기준으로 이전 6개월단위로 조회 가능
- 일정 달력 조회 가능(일정이 있는 날은 점 표시)
- 날짜 선택하여 일정 목록 조회, 일정 추가, 일정 삭제, 일정 상태 변경, 일정 순서 변경 가능(드래그 앤 드롭)
- 일정 상태에 따른 직관적인 컬러
- 우측 상단 네비게이션 메뉴로 친구, 알림 관리 가능
- 방 생성하기 버튼 클릭 시 방 이름 입력하여 방 생성 가능
- 참여 중인 방이 있다면 재입장 가능

### 알림 모달
<img width="679" height="508" alt="초대2" src="https://github.com/user-attachments/assets/761c8f36-1615-47da-8214-8746e6a3cec5" />

- 받은 친구 요청, 받은 초대 요청 조회 가능
- 받은 친구 및 초대 요청은 수락 및 거절 가능

### 친구 모달
<img width="602" height="673" alt="친구찾기" src="https://github.com/user-attachments/assets/dcebe03c-cede-4010-906a-33646d000521" />

- 친구 목록 조회 가능
- 친구 삭제 가능
- 닉네임으로 친구 검색 가능
- 닉네임으로 유저 조회 및 친구 추가 가능

### 스터디룸(방) 페이지
<img width="1895" height="888" alt="메인" src="https://github.com/user-attachments/assets/6b5b8123-dc6f-4d06-8a8b-f516425907fc" />
<img width="1902" height="896" alt="남의스케줄" src="https://github.com/user-attachments/assets/64f7038e-0847-4b38-a30a-0fe3dba9d50e" />
<img width="1022" height="868" alt="초대" src="https://github.com/user-attachments/assets/5a68bbe4-aed5-4c6d-b1b6-cf88b44f6da0" />
<img width="819" height="774" alt="방나가기" src="https://github.com/user-attachments/assets/1cb4a398-3038-4704-9df0-5da0e1ae0fb1" />
<img width="479" height="826" alt="반응형2" src="https://github.com/user-attachments/assets/c491c22e-5186-4675-9502-5227ca25b74d" />

- 로고 클릭 시 랜딩페이지로 이동
- 스톱워치로 학습 및 업무 시간 기록 가능(실시간 동기화)
- 오늘의 일정 목록 조회 및 일정 추가, 삭제, 순서변경, 상태변경 가능
- 참가자 목록 조회 및 참가자의 일정 목록 조회 가능
- 실시간 채팅 가능
- 방을 나갔다 다시 들어가도 학습 시간 보존
- 방 나가기 가능능
- 친구 초대 가능
- 방을 완전히 나가거나 스톱워치를 멈추면 분 단위로 학습(업무)시간 저장됨
- 참여자들의 진행 중인 최상단 일정 조회 가능(실시간)
-----

## 📊 데이터베이스 스키마

### 주요 모델

- **User** - 사용자 정보, totalStudyTime 추적
- **Room** - 스터디룸 정보
- **RoomParticipation** - 사용자-룸 참여 관계
- **Schedule** - 일정 관리 (상태, 순서)
- **TimeLog** - 일별 학습 시간 기록 (Room 삭제 시 보존)
- **Friend** - 친구 관계 (pending/accepted)
- **RefreshToken** - JWT 리프레시 토큰 관리
- **RoomInvite** - 스터디룸 초대
- **ChatMessage** - 채팅 메시지

### 데이터 무결성

- Room 삭제 시 `TimeLog.roomCuid = NULL` (학습 기록 보존)
- CASCADE 삭제: User 삭제 시 관련 데이터 자동 삭제
- 복합 인덱스: 채팅 조회 성능 최적화 (roomCuid, createdAt)

---

## 💡 기술적 하이라이트

- WebSocket 기반 실시간 타이머 동기화 - 500ms 주기로 전체 참가자에게 타이머 상태 브로드캐스트, 접속 해제된 클라이언트 자동 감지 및 정리 로직 구현
- 일정 순서 관리 시스템 - Drag & Drop 기반 일정 재정렬 시 트랜잭션으로 일괄 업데이트
- 채팅 메시지 전송 시 Optimistic Update로 네트워크 지연 없이 즉시 UI 반영, 서버 응답 실패 시 자동 롤백 처리로 데이터 일관성 유지
- 이미지 최적화 전략 구현 - Next.js Image 컴포넌트로 WebP/AVIF 포맷 우선 적용, 반응형 이미지(데스크탑/모바일 별도), priority/lazy loading 전략으로 LCP 1.8초 이내 달성
- Tailwind CSS 반응형 디자인 시스템 - 모바일 우선 설계로 모든 화면 크기 대응, 34개의 재사용 가능한 컴포넌트 설계 및 구현

---

## 🎯 향후 개선 계획

- [ ] 실시간 알림 기능 (Push Notification)
- [ ] 다크 모드 지원
- [ ] 모바일 앱 (React Native) - 백그라운드 타이머
- [ ] 소셜 로그인
- [ ] 학습 목표 설정 및 달성률 추적
