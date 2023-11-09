import React from "react";

function AvatarProfile({ width }) {
  const avatarStyle = {
    width: `${width}px`, // Menggunakan properti width dari prop untuk menentukan lebar avatar
  };

  return (
    <>
      <a className="avatar" href="">
        <div className="mask mask-squircle" style={avatarStyle}>
          <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bWFufGVufDB8fDB8fHww" />
        </div>
      </a>
    </>
  );
}

export default AvatarProfile;