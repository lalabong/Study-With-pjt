'use client';

import { useState, useMemo, useEffect } from 'react';

import Image from 'next/image';

import { HiPencil, HiCheck, HiX } from 'react-icons/hi';

import Button from '@components/common/Button';
import Input from '@components/common/Input';

interface UserProfileProps {
  nickname: string;
  profileImg?: string | null;
  additionalInfo?: string;
  editable?: boolean;
  onNicknameChange?: (newNickname: string) => void;
  onProfileImgChange?: (newImage: string | File) => void;
  mainContainerClasses?: string;
}

const UserProfile = ({
  nickname,
  profileImg,
  additionalInfo,
  editable = false,
  onNicknameChange,
  onProfileImgChange,
  mainContainerClasses = '',
}: UserProfileProps) => {
  const [displayNickname, setDisplayNickname] = useState(nickname);

  const [isEditingNickname, setIsEditingNickname] = useState(false);
  const [nicknameInput, setNicknameInput] = useState(nickname);
  const [profileImgPreview, setProfileImgPreview] = useState<string | null>(null);

  useEffect(() => {
    setDisplayNickname(nickname);
  }, [nickname]);

  const { isNicknameChanged, isNicknameEmpty } = useMemo(() => {
    return {
      isNicknameChanged: nicknameInput.trim() !== nickname,
      isNicknameEmpty: nicknameInput.trim() === '',
    };
  }, [nicknameInput, nickname]);

  // 닉네임 수정 버튼 클릭 시
  const handleNicknameEdit = () => {
    setIsEditingNickname(true);
    setNicknameInput(displayNickname);
  };

  // 닉네임 수정 취소 버튼 클릭 시
  const handleNicknameCancel = () => {
    setIsEditingNickname(false);
    setNicknameInput(displayNickname);
  };

  // 닉네임 수정 저장 버튼 클릭 시
  const handleNicknameSave = async () => {
    if (nicknameInput.trim() && onNicknameChange && isNicknameChanged) {
      setDisplayNickname(nicknameInput.trim());
      setIsEditingNickname(false);

      try {
        await onNicknameChange(nicknameInput);
      } catch {
        setDisplayNickname(nickname);
      }
    } else {
      setIsEditingNickname(false);
    }
  };

  // 수정할 이미지 선택 시
  const handleProfileImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      const reader = new FileReader();
      reader.onload = (event) => {
        /* 파일 읽기가 완료되었을 때 실행할 콜백 함수 */
        if (event.target && event.target.result) {
          const dataUrl = event.target.result as string;
          setProfileImgPreview(dataUrl);

          if (onProfileImgChange) {
            onProfileImgChange(file);
          }
        }
      };
      reader.readAsDataURL(file); // 파일 읽기 시작
    }
  };

  return (
    <div className={`flex items-center ${mainContainerClasses}`}>
      <div className="relative mr-4">
        <div className="h-16 w-16 overflow-hidden rounded-full bg-gray-200">
          {profileImgPreview ? (
            <Image
              src={profileImgPreview}
              alt="변경한 프로필 이미지"
              width={64}
              height={64}
              className="h-full w-full object-cover"
            />
          ) : profileImg ? (
            <Image
              src={profileImg}
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

        {editable && onProfileImgChange && (
          <div className="absolute -bottom-2 -right-2 flex space-x-1">
            <input
              id="profile-image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleProfileImgChange}
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
                <Button
                  size="sm"
                  onClick={handleNicknameSave}
                  disabled={!isNicknameChanged || isNicknameEmpty}
                  variant="primary"
                >
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
              <h3 className="text-lg font-medium">{displayNickname}</h3>
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
