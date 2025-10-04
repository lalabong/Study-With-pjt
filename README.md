# SWith (Study-With)

> 실시간 협업 기능을 갖춘 온라인 스터디 플랫폼

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
