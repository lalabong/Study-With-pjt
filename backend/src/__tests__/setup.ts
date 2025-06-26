import { config } from 'dotenv';

process.env.NODE_ENV = 'test';

// 환경변수 로드
config();

jest.setTimeout(30000);

beforeAll(async () => {
  console.log('🧪 테스트 환경 초기화');
  console.log('📍 NODE_ENV:', process.env.NODE_ENV);
  console.log('🔑 ACCESS_TOKEN_SECRET:', process.env.ACCESS_TOKEN_SECRET ? '설정됨' : '미설정');
  console.log('🔑 REFRESH_TOKEN_SECRET:', process.env.REFRESH_TOKEN_SECRET ? '설정됨' : '미설정');
});

afterAll(async () => {
  console.log('✅ 테스트 완료');
}); 