import Image from "next/image";

const ProfileAvatar = ({ condition, height, width, src = "", styleClass }) => {
  return condition ? (
    <Image
      src={src}
      alt="profile"
      height={height}
      width={width}
      className={styleClass}
    />
  ) : (
    <Image
      src="/images/useravatarplaceholder.jpg"
      alt="profile"
      height={height}
      width={width}
      className={styleClass}
    />
  );
};

export default ProfileAvatar;
