import React, { FC } from "react";

import ImageComponent from "../image-component/ImageComponent";
import ImageDefault from "../image-default/ImageDefault";
import { IAvatar } from "../../../interfaces/avatar.interface";

const Avatar = ({
  avatar,
  login,
  border,
  width,
  height,
  fz,
}: IAvatar): JSX.Element => {
  return (
    <>
      {avatar ? (
        <ImageComponent
          alt="user"
          borderRadius={border}
          width={width}
          height={height}
          image={`http://194.169.160.152/api/portfolio/file/users/${avatar}`}
        />
      ) : (
        <ImageDefault
          alt={"user"}
          borderRadius={border}
          text={login}
          fz={fz}
          height={width}
          width={height}
        />
      )}
    </>
  );
};

export default Avatar;
