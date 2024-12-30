// import { useMsal } from "@azure/msal-react";
import { Image, LI, P } from "../../../../AbstractElements";

import ProfileBox from "./ProfileBox";

/**
 * NOTE:
 * this activeAccountClaims not correctly loading at first time and need to fix this issue later.
 * Until that Username and Role hardcoded.
 */

const UserProfile = () => {
  // const { instance } = useMsal();
  // const activeAccountClaims = instance.getActiveAccount()?.idTokenClaims;

  return (
    <LI className="profile-nav onhover-dropdown p-0">
      <div className="d-flex profile-media align-items-center">
        <Image className="b-r-10 img-40" src={""} alt="user" />
        <div className="flex-grow-1">
          {/* <span>{activeAccountClaims?.name}</span> */}
          <span>{"John Doe"}</span>
          <P className="mb-0">{"Admin"}</P>
        </div>
      </div>
      <ProfileBox />
    </LI>
  );
};

export default UserProfile;
