'use client';

import Image from 'next/image';

interface UserProfileSmallProps {
  nickname: string;
  profileImg?: string | null;
  additionalInfo?: string;
}

const UserProfileSmall = ({ nickname, profileImg, additionalInfo }: UserProfileSmallProps) => {
  return (
    <div className="flex items-center">
      <div className="relative mr-3">
        <div className="h-12 w-12 overflow-hidden rounded-full bg-gray-200">
          {profileImg ? (
            <Image
              src={profileImg}
              alt="프로필 이미지"
              width={40}
              height={40}
              className="h-full w-full object-cover"
              unoptimized
            />
          ) : (
            <Image
              src="/images/default-user-image.png"
              alt="기본 프로필 이미지"
              width={40}
              height={40}
              className="h-full w-full object-cover"
            />
          )}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-900">{nickname}</h4>
        {additionalInfo && (
          <p className="text-xs text-gray-500" aria-label="추가 정보">
            {additionalInfo}
          </p>
        )}
      </div>
    </div>
  );
};

export default UserProfileSmall;
