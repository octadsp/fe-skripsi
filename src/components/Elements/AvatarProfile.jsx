import React from "react";
import { Link } from "react-router-dom";

function AvatarProfile({ width, state }) {
  const avatarStyle = {
    width: `${width}px`, // Menggunakan properti width dari prop untuk menentukan lebar avatar
  };

  return (
    <>
      <Link to={"/profile"} className="avatar static" href="">
        <div className="rounded-3xl" style={avatarStyle}>
          <img src={state?.user?.image} />
        </div>
      </Link>
    </>
  );
}

export default AvatarProfile;
