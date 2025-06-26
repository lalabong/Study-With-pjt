# Node.js 22 알파인 이미지 사용 (경량화)
FROM node:22-alpine AS builder

# 작업 디렉토리 설정
WORKDIR /app

# 패키지 파일 복사 및 의존성 설치
# dev Dependencies 제외 설치, npm 캐시 삭제로 이미지 크기 최소화화
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# 소스 코드 복사
COPY . .

# Prisma 클라이언트 생성
RUN npx prisma generate

# TypeScript 빌드
RUN npm run build

# 프로덕션 스테이지
FROM node:22-alpine AS production

# 보안을 위한 non-root 사용자 생성
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

WORKDIR /app

# 빌드된 파일과 의존성 복사(소스코드, devDependencies, 빌드 도구들, .git, md 등등 제외)
COPY --from=builder --chown=nextjs:nodejs /app/dist ./dist
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/package*.json ./
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma

# 업로드 디렉토리 생성
RUN mkdir -p /app/uploads/profiles && chown -R nextjs:nodejs /app/uploads

# 사용자 변경(ROOT 권한 제거)
USER nextjs

# 포트 노출
EXPOSE 3000

# 헬스 체크 추가
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:3000/health || exit 1

# 애플리케이션 시작
CMD ["node", "dist/index.js"] 