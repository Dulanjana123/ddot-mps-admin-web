import { CdButton } from "@atoms/index";
import { useMsal } from "@azure/msal-react";

const Unauthorized = () => {
  const { instance } = useMsal();

  const onSignIn = () => {
    instance.logoutRedirect();
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Unauthorized</h1>
      <p>You do not have permission to view this page.</p>
      <CdButton id="btn-sign-in" onClick={onSignIn}>
        Sign In
      </CdButton>
    </div>
  );
};

export default Unauthorized;
