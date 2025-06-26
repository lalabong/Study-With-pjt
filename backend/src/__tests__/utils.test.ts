import { formatDateToYYYYMMDD } from '#src/utils/dateUtils';
import { generateAccessToken, generateRefreshToken, verifyAccessToken } from '#src/utils/tokenUtils';

describe('🛠️ 유틸 함수 테스트', () => {
  
  describe('날짜 유틸리티', () => {
    test('formatDateToYYYYMMDD - 정상 날짜 변환', () => {
      const testDate = new Date('2024-01-15T10:30:00.000Z');
      const result = formatDateToYYYYMMDD(testDate);
      
      expect(result).toBe('2024-01-15');
      expect(typeof result).toBe('string');
    });

    test('formatDateToYYYYMMDD - 다양한 날짜 형식', () => {
      const testCases = [
        { input: new Date('2024-12-31T23:59:59.999Z'), expected: '2024-12-31' },
        { input: new Date('2024-01-01T00:00:00.000Z'), expected: '2024-01-01' },
        { input: new Date('2024-06-15T12:00:00.000Z'), expected: '2024-06-15' },
      ];

      testCases.forEach(({ input, expected }) => {
        expect(formatDateToYYYYMMDD(input)).toBe(expected);
      });
    });
  });

  describe('토큰 유틸리티', () => {
    const mockUserPayload = {
      id: 'test-user-id',
      userId: 'testuser',
      createdAt: new Date('2024-01-01'),
    };

    let originalAccessTokenSecret: string | undefined;
    let originalRefreshTokenSecret: string | undefined;

    beforeEach(() => {
      originalAccessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
      originalRefreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
    });

    afterEach(() => {
      process.env.ACCESS_TOKEN_SECRET = originalAccessTokenSecret;
      process.env.REFRESH_TOKEN_SECRET = originalRefreshTokenSecret;
    });

    describe('generateAccessToken', () => {
      test('✅ 정상적인 Access Token 생성', () => {
        const token = generateAccessToken(mockUserPayload);
        
        expect(token).toBeDefined();
        expect(typeof token).toBe('string');
        expect(token.split('.')).toHaveLength(3);
      });

      test('❌ ACCESS_TOKEN_SECRET 누락시 에러', () => {
        delete process.env.ACCESS_TOKEN_SECRET;
        
        expect(() => {
          generateAccessToken(mockUserPayload);
        }).toThrow('ACCESS_TOKEN_SECRET이 설정되지 않았습니다.');
      });
    });

    describe('generateRefreshToken', () => {
      test('✅ 정상적인 Refresh Token 생성', () => {
        const token = generateRefreshToken(mockUserPayload);
        
        expect(token).toBeDefined();
        expect(typeof token).toBe('string');
        expect(token.split('.')).toHaveLength(3);
      });

      test('❌ REFRESH_TOKEN_SECRET 누락시 에러', () => {
        delete process.env.REFRESH_TOKEN_SECRET;
        
        expect(() => {
          generateRefreshToken(mockUserPayload);
        }).toThrow('REFRESH_SECRET이 설정되지 않았습니다.');
      });
    });

    describe('verifyAccessToken', () => {
      test('✅ 유효한 토큰 검증', () => {
        const token = generateAccessToken(mockUserPayload);
        const payload = verifyAccessToken(token);
        
        expect(payload).toBeDefined();
        expect(payload).toHaveProperty('id', mockUserPayload.id);
        expect(payload).toHaveProperty('userId', mockUserPayload.userId);
        expect(payload).toHaveProperty('iat'); // 발급 시간
        expect(payload).toHaveProperty('exp'); // 만료 시간
      });

      test('❌ 잘못된 토큰 형식', () => {
        const invalidToken = 'invalid.token.format';
        const payload = verifyAccessToken(invalidToken);
        
        expect(payload).toBeNull();
      });

      test('❌ 완전히 잘못된 토큰', () => {
        const invalidToken = 'completely-wrong-token';
        const payload = verifyAccessToken(invalidToken);
        
        expect(payload).toBeNull();
      });

      test('❌ 빈 토큰', () => {
        const payload = verifyAccessToken('');
        expect(payload).toBeNull();
      });

      test('❌ ACCESS_TOKEN_SECRET 누락시 에러', () => {
        // 먼저 유효한 토큰 생성
        const token = generateAccessToken(mockUserPayload);
        
        // 그 다음 환경변수 삭제
        delete process.env.ACCESS_TOKEN_SECRET;
        
        // verifyAccessToken은 에러를 던지지 않고 null을 반환함
        const payload = verifyAccessToken(token);
        expect(payload).toBeNull();
      });
    });

    describe('토큰 무결성 테스트', () => {
      test('생성된 토큰이 올바르게 검증되는지 확인', () => {
        const accessToken = generateAccessToken(mockUserPayload);
        const refreshToken = generateRefreshToken(mockUserPayload);
        
        // Access Token 검증
        const accessPayload = verifyAccessToken(accessToken);
        expect(accessPayload).toHaveProperty('id', mockUserPayload.id);
        expect(accessPayload).toHaveProperty('userId', mockUserPayload.userId);
        
        // 두 토큰이 다른지 확인
        expect(accessToken).not.toBe(refreshToken);
      });

      test('다른 사용자 토큰은 다르게 생성되는지 확인', () => {
        const user1 = { ...mockUserPayload, id: 'user1' };
        const user2 = { ...mockUserPayload, id: 'user2' };
        
        const token1 = generateAccessToken(user1);
        const token2 = generateAccessToken(user2);
        
        expect(token1).not.toBe(token2);
        
        const payload1 = verifyAccessToken(token1);
        const payload2 = verifyAccessToken(token2);
        
        expect(payload1?.id).toBe('user1');
        expect(payload2?.id).toBe('user2');
      });
    });
  });
}); 