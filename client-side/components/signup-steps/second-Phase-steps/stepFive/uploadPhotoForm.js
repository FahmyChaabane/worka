import { useMemo } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Styles from "../steps.module.scss";

const UploadPhotoForm = ({ avatar, setAvatarForm, error, title, forEdit }) => {
  // console.log("avatar", avatar);
  const router = useRouter();

  const handleChange = ({ target }) => {
    // console.log("target", validity);
    // console.log("target", files);
    // console.log("target", target.value);

    // const formData = new FormData();
    // formData.append("myFile", fileData, fileData.name);
    // mutate({ variables: { file: fileData } });

    const fileData = target.files[0];
    if (!fileData) return;
    console.log("pic", fileData);
    setAvatarForm(fileData);
  };

  const removeAvatar = () => {
    console.log("to remove");
    setAvatarForm(null);
  };

  const memoizedImg = useMemo(() => {
    // condition for before props pops-up
    if (avatar && avatar instanceof File) return URL.createObjectURL(avatar);
    // console.log("inside memo");
    return null;
  }, [avatar]);

  return (
    <div
      className={[
        Styles.layout,
        error ? Styles.layout_invalidborder : Styles.layout_validborder,
      ].join(" ")}
    >
      <div className={Styles.layout_inside}>
        <p className={Styles.headingmd}>Click to upload a profile picture:</p>
        <div>
          <div
            className={Styles.layout_inside_upload_trash}
            onClick={removeAvatar}
          >
            <svg className={Styles.layout_inside_upload_trash_icon}>
              <use href="/images/sprite.svg#icon-trash"></use>
            </svg>
          </div>

          <label htmlFor="upload" className={Styles.layout_inside_upload}>
            <div className={Styles.layout_inside_upload_logocontainer}>
              {memoizedImg || forEdit ? (
                <div
                  className={Styles.layout_inside_upload_logocontainer_photo}
                >
                  <Image
                    unoptimized={true}
                    layout="fill"
                    alt="avatar"
                    src={
                      memoizedImg
                        ? memoizedImg
                        : `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT_URI}${avatar}`
                    }
                  ></Image>
                </div>
              ) : (
                <svg
                  className={Styles.layout_inside_upload_logocontainer_photo}
                >
                  <use href="/images/sprite.svg#icon-user"></use>
                </svg>
              )}
            </div>
            <h1 className={Styles.headingmd}>
              {router.query.name} {router.query.surname}
            </h1>
            <p className={Styles.headingmd}>{title}</p>
            {/* <div className={Styles.layout_inside_upload_availability}>
            <span
              className={Styles.layout_inside_upload_availability_status}
            ></span>
            <span className={Styles.headingsm}>Available for work</span>
          </div> */}
          </label>
        </div>
        <input
          className={Styles.layout_inside_upload_hide}
          type="file"
          id="upload"
          name="avatar"
          onChange={handleChange}
        />
        {error && (
          <div className={Styles.layout_inside_questionsGrid_error}>
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadPhotoForm;
