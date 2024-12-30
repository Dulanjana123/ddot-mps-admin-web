import Breadcrumbs from "@common-elements/Breadcrumbs/Breadcrumbs";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { Card, CardBody, Container } from "reactstrap";
import AddUpdatePermissionsForm from "./AddUpdatePermissionsForm";
import { ActionMode } from "@enums/ActionMode";

const AddUpdatePermissions = ({ mode }: { mode: ActionMode }) => {
  const [isLoading, setIsLoading] = useState(false);

  const onCreateHandler: SubmitHandler<any> = async (data) => {
    console.log("SUBMIT DATA", data);
  };

  return (
    <div className="page-body">
      <Breadcrumbs
        mainTitle={
          mode === ActionMode.Add ? "Create User Roles" : "Update User Roles"
        }
        parent="Permissions"
      />
      <Container fluid>
        <Card>
          <CardBody>
            <AddUpdatePermissionsForm
              onSubmit={onCreateHandler}
              isLoading={isLoading}
              buttonText="Create"
            />
          </CardBody>
        </Card>
      </Container>
    </div>
  );
};

export default AddUpdatePermissions;
