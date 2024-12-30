import CdSpinner from "@atoms/Spinner/CdSpinner";
import { loginRequest } from "@config/auth-config";
import { useEffect } from "react";
import { useMsal } from "@azure/msal-react";

const B2CLoginRedirect: React.FC = () => {
  const { instance } = useMsal();

  useEffect(() => {
    //setTimeout(() => {
      handleLoginRedirect();
    //}, 5000);
  }, []);

  const handleLoginRedirect = async () => {
    await instance
      .loginRedirect(loginRequest)
      .catch((error) => {
        console.log("B2CLoginRedirect Error: ", error);
        //instance.logoutRedirect();
      }); // this console.log should be removed later
  };

  return (
    <div className="common-container">
      <CdSpinner />
    </div>
  );
};

export default B2CLoginRedirect;
