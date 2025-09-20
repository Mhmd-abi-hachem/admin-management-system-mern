import SignupForm from "../features/authentication/SignupForm";
import Heading from "../shared/ui/Heading/Heading";

function AddUsers() {
  return (
    <>
      <Heading as="h1">Add a new user</Heading>
      <SignupForm />
    </>
  );
}

export default AddUsers;
