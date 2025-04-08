import { dirname } from 'path';
import { fileURLToPath } from 'url';

import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ),
  {
    rules: {
      'prettier/prettier': 'error',
      '@typescript-eslint/explicit-function-return-type': 'off', // 함수 반환 타입 명시 비활성화
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }], // 사용하지 않는 변수 비활성화(_로 시작하면 무시)
      '@typescript-eslint/explicit-module-boundary-types': 'warn', // 함수 명시적 타입을 요구
      '@typescript-eslint/ban-ts-comment': [
        'error',
        {
          'ts-ignore': 'allow-with-description',
          'ts-nocheck': 'allow-with-description',
          'ts-expect-error': 'allow-with-description',
        },
      ], // ts-ignore 사용 시 설명 추가 요구
      'react-hooks/rules-of-hooks': 'error', // 리액트 훅 규칙 활성화(리액트 훅은 함수 최상단에서만 호출 가능)
      'react-hooks/exhaustive-deps': 'warn', // 의존성 빠져있는 경우 경고
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'], // import 순서 그룹화
          'newlines-between': 'always', // 그룹 사이 줄바꿈
          alphabetize: { order: 'asc' }, // 알파벳 순서로 정렬
        },
      ],
      'import/no-unresolved': 'error', // 잘못된 import 경로 방지
      'no-console': ['warn', { allow: ['warn', 'error'] }], // console.log 사용 경고
      'no-debugger': 'error', // debugger 사용 방지
      'react/jsx-uses-react': 'error', // React JSX 사용 확인
      'react/jsx-uses-vars': 'error', // JSX 내 변수/컴포넌트 사용 확인
    },
  },
];

export default eslintConfig;
