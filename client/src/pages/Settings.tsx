import Heading from "../shared/ui/Heading/Heading";
import Row from "../shared/ui/Row/Row";
import UpdateSettingsForm from "../features/settings/UpdateSettingsForm";

function Settings() {
  return (
    <Row>
      <Heading as="h1">Update hotel settings</Heading>
      <UpdateSettingsForm />
    </Row>
  );
}

export default Settings;
