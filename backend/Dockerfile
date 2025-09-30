# Node.js 22 알파인 이미지 사용 (경량화)
FROM node:22-alpine AS builder

# 작업 디렉토리 설정
WORKDIR /app

# 패키지 파일과 Prisma 스키마 복사
COPY package*.json ./
COPY prisma ./prisma

# 의존성 설치 (development dependencies 포함 - 빌드에 필요)
RUN npm ci && npm cache clean --force

# 소스 코드 복사
COPY . .

# Prisma 클라이언트 생성
RUN npx prisma generate

# TypeScript 빌드
RUN npm run build
# 생성된 Prisma 클라이언트를 dist 폴더에도 복사 (TypeScript 빌드 후)
RUN cp -r src/generated dist/src/

# 프로덕션 스테이지
FROM node:22-alpine AS production

# 보안을 위한 non-root 사용자 생성
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

WORKDIR /app

# 패키지 파일과 prisma 스키마 복사
COPY --from=builder --chown=nextjs:nodejs /app/package*.json ./
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma

# production 의존성만 설치
RUN npm ci --only=production && npm cache clean --force

# 빌드된 파일과 필요한 파일들 복사
COPY --from=builder --chown=nextjs:nodejs /app/dist ./dist
COPY --from=builder --chown=nextjs:nodejs /app/src/generated ./src/generated
# 업로드 디렉토리 생성
RUN mkdir -p /app/uploads/profiles && chown -R nextjs:nodejs /app/uploads

# 사용자 변경(ROOT 권한 제거)
USER nextjs

# 포트 노출
EXPOSE 4000

# 헬스 체크 추가
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:4000/health || exit 1

CMD ["npm", "start"]

