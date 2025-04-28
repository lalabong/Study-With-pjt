'use client';

import { useState } from 'react';

import Image from 'next/image';

import { HiPencil, HiCheck, HiX } from 'react-icons/hi';

import Button from './Button';
import Input from './Input';

interface UserProfileProps {
  nickname: string;
  profileImage?: string | null;
  additionalInfo?: string;
  editable?: boolean;
  onNicknameChange?: (newNickname: string) => void;
  onProfileImageChange?: (newImage: string | File) => void;
  className?: string;
}

const UserProfile = ({
  nickname,
  profileImage,
  additionalInfo,
  editable = false,
  onNicknameChange,
  onProfileImageChange,
  className = '',
}: UserProfileProps) => {
  const [isEditingNickname, setIsEditingNickname] = useState(false);
  const [nicknameInput, setNicknameInput] = useState(nickname);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null);

  const handleNicknameEdit = () => {
    setIsEditingNickname(true);
  };

  const handleNicknameCancel = () => {
    setIsEditingNickname(false);
    setNicknameInput(nickname);
  };

  const handleNicknameSave = () => {
    if (nicknameInput.trim() && onNicknameChange) {
      onNicknameChange(nicknameInput);
    }
    setIsEditingNickname(false);
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      const reader = new FileReader();
      reader.onload = (event) => {
        /* 파일 읽기가 완료되었을 때 실행할 콜백 함수 */
        if (event.target && event.target.result) {
          const dataUrl = event.target.result as string;
          setProfileImagePreview(dataUrl);

          if (onProfileImageChange) {
            onProfileImageChange(file);
          }
        }
      };
      reader.readAsDataURL(file); // 파일 읽기 시작
    }
  };

  return (
    <div className={`flex items-center ${className}`}>
      <div className="relative mr-4">
        <div className="h-16 w-16 overflow-hidden rounded-full bg-gray-200">
          {profileImagePreview ? (
            <Image
              src={profileImagePreview}
              alt="변경한 프로필 이미지"
              width={64}
              height={64}
              className="h-full w-full object-cover"
            />
          ) : profileImage ? (
            <Image
              src={profileImage}
              alt="프로필 이미지"
              width={64}
              height={64}
              className="h-full w-full object-cover"
              unoptimized
            />
          ) : (
            <Image
              src={'/images/default-user-image.png'}
              alt="기본 프로필 이미지"
              width={64}
              height={64}
              className="h-full w-full object-cover"
            />
          )}
        </div>

        {editable && onProfileImageChange && (
          <div className="absolute -bottom-2 -right-2 flex space-x-1">
            <input
              id="profile-image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleProfileImageChange}
            />
            <label
              htmlFor="profile-image-upload"
              className="rounded-full bg-gray-100 p-1 text-gray-500 hover:text-gray-700 cursor-pointer shadow-sm"
              aria-label="프로필 사진 업로드"
            >
              <HiPencil className="h-4 w-4" />
            </label>
          </div>
        )}
      </div>

      <div>
        <div className="flex items-center">
          {isEditingNickname ? (
            <div className="flex items-center">
              <Input
                id="change-nickname-input"
                type="text"
                value={nicknameInput}
                onChange={(e) => setNicknameInput(e.target.value)}
                autoFocus
              />
              <div className="flex flex-row space-x-2 pl-2">
                <Button size="sm" onClick={handleNicknameSave}>
                  <span className="flex items-center gap-1 whitespace-nowrap">
                    <HiCheck className="h-4 w-4" />
                    저장
                  </span>
                </Button>
                <Button size="sm" onClick={handleNicknameCancel} variant="secondary">
                  <span className="flex items-center gap-1 whitespace-nowrap">
                    <HiX className="h-4 w-4" />
                    취소
                  </span>
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-center">
              <h3 className="text-lg font-medium">{nickname}</h3>
              {editable && onNicknameChange && (
                <button
                  onClick={handleNicknameEdit}
                  className="ml-2 text-gray-500 hover:text-gray-700 cursor-pointer"
                  aria-label="닉네임 변경"
                >
                  <HiPencil className="h-4 w-4" />
                </button>
              )}
            </div>
          )}
        </div>

        {additionalInfo && (
          <p className="text-sm text-gray-500" aria-label="추가 정보">
            {additionalInfo}
          </p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
