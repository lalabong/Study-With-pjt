import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { createErrorResponse } from '#src/utils/responseUtils';
import { USER_ERROR, ERROR_CODES } from '#src/constants/errorMessages';

declare global {
  namespace Express {
    interface Request {
      file?: Multer.File;
    }
  }
}

// 프로필 이미지 저장 경로
const UPLOAD_PATH = path.join(process.cwd(), 'uploads', 'profiles');

// 디렉토리가 없으면 생성
if (!fs.existsSync(UPLOAD_PATH)) {
  fs.mkdirSync(UPLOAD_PATH, { recursive: true });
}

// 프로필 이미지 저장을 위한 multer 설정
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_PATH);
  },
  filename: (req, file, cb) => {
    const userId = req.params.userId;
    const fileExt = path.extname(file.originalname);
    const fileName = `${userId}_${Date.now()}${fileExt}`;
    cb(null, fileName);
  },
});

const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(USER_ERROR.INVALID_FILE_TYPE));
  }
};

// 프로필 이미지 업로드 미들웨어
export const uploadProfileImg = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB 제한
  },
}).single('profileImg');

// 파일 경로 생성 함수
export const getProfileImgPath = (filename: string): string => {
  const serverUrl = process.env.SERVER_URL;
  return `${serverUrl}/uploads/profiles/${filename}`;
};

// 오류 처리 미들웨어
export const handleFileUploadErrors = (err: any, req: any, res: any, next: any) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return createErrorResponse(
        res,
        413,
        USER_ERROR.FILE_SIZE_TOO_LARGE,
        ERROR_CODES.USER_FILE_SIZE_TOO_LARGE
      );
    }
    return createErrorResponse(
      res,
      400,
      USER_ERROR.FILE_UPLOAD_ERROR,
      ERROR_CODES.USER_FILE_UPLOAD_ERROR
    );
  }

  if (err.message && err.message.includes('지원하지 않는 파일 형식')) {
    return createErrorResponse(
      res,
      415,
      USER_ERROR.INVALID_FILE_TYPE,
      ERROR_CODES.USER_INVALID_FILE_TYPE
    );
  }

  next(err);
};
