import { config } from 'dotenv';

process.env.NODE_ENV = 'test';

// 환경변수 로드
config();

jest.setTimeout(30000);

beforeAll(async () => {
  console.log('🧪 테스트 환경 초기화');
  console.log('📍 NODE_ENV:', process.env.NODE_ENV);

  // CI 환경에서 환경 변수가 없으면 테스트용 기본값 설정
  if (!process.env.ACCESS_TOKEN_SECRET) {
    process.env.ACCESS_TOKEN_SECRET = 'test-access-token-secret-for-ci';
    console.log('🔑 ACCESS_TOKEN_SECRET: 테스트용 기본값 설정');
  } else {
    console.log('🔑 ACCESS_TOKEN_SECRET: 설정됨');
  }

  if (!process.env.REFRESH_TOKEN_SECRET) {
    process.env.REFRESH_TOKEN_SECRET = 'test-refresh-token-secret-for-ci';
    console.log('🔑 REFRESH_TOKEN_SECRET: 테스트용 기본값 설정');
  } else {
    console.log('🔑 REFRESH_TOKEN_SECRET: 설정됨');
  }
});

afterAll(async () => {
  console.log('✅ 테스트 완료');
});
