import { Link } from "react-router-dom";
import { FeatherIcons, LI, UL } from "../../../../AbstractElements";
import { profilesMessage } from "@data/layout-data/header-data";
import { useMsal } from "@azure/msal-react";

const ProfileBox = () => {
  const { instance } = useMsal();

  const handleClick = (name: string) => {
    if (name === "Log Out") {
      instance.logoutRedirect();
    }
  };
  return (
    <UL className="profile-dropdown onhover-show-div simple-list">
      {profilesMessage.map((data, index) => (
        <LI key={index}>
          <Link to={data.link} onClick={() => handleClick(data.name)}>
            <FeatherIcons iconName={data.icon} />
            <span>{data.name} </span>
          </Link>
        </LI>
      ))}
    </UL>
  );
};

export default ProfileBox;
