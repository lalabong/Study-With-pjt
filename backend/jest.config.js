export default {
  preset: 'ts-jest/presets/default-esm', // 테스트 환경 설정(타입스크립트 및 ESM 지원)
  extensionsToTreatAsEsm: ['.ts'], // 테스트 파일 확장자 설정
  testEnvironment: 'node', // 테스트 환경 설정(Node.js)
  roots: ['<rootDir>/src'], // 테스트 파일 검색 루트 디렉토리
  testMatch: ['**/__tests__/**/*.test.ts', '**/__tests__/**/*.spec.ts', '**/*.test.ts', '**/*.spec.ts'], // 테스트 파일 검색 패턴
  transform: {
    '^.+\\.ts$': ['ts-jest', {
      useESM: true, // ESM 지원
      tsconfig: {
        module: 'esnext',
        moduleResolution: 'bundler' // node16에서 bundler로 변경
      }
    }]
  },
  // 모듈 파일 확장자 해석
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  // 모듈 해석 설정
  resolver: undefined, // 기본 해석기 사용
  // 모듈 이름 매핑 - .js 확장자를 .ts로 해석
  moduleNameMapper: {
    '^(.+)\\.js$': '$1',
    '^#src/(.*)$': '<rootDir>/src/$1', 
    '^#lib/(.*)$': '<rootDir>/src/lib/$1', 
    '^#controllers/(.*)$': '<rootDir>/src/controllers/$1', 
    '^#middlewares/(.*)$': '<rootDir>/src/middlewares/$1', 
    '^#models/(.*)$': '<rootDir>/src/models/$1', 
    '^#routes/(.*)$': '<rootDir>/src/routes/$1', 
    '^#db$': '<rootDir>/src/db.ts' 
  },
  // 커버리지 수집 제외 파일 패턴
  collectCoverageFrom: [
    'src/**/*.ts', 
    '!src/**/*.d.ts', 
    '!src/generated/**', 
    '!src/**/*.test.ts', 
    '!src/**/*.spec.ts'
  ],
  coverageDirectory: 'coverage', // 커버리지 결과 저장 디렉토리
  coverageReporters: ['text', 'lcov', 'html'], // 커버리지 결과 형식
  setupFilesAfterEnv: ['<rootDir>/src/__tests__/setup.ts'], // 테스트 환경 설정 파일
  testTimeout: 30000 // 테스트 제한 시간
}; 