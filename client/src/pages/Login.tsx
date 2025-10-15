import LoginForm from "../features/authentication/LoginForm";
import Heading from "../shared/ui/Heading/Heading";
import Logo from "../shared/ui/Logo";

function Login() {
  return (
    <main className="min-h-screen grid md:grid-cols-[48rem] bg-[color:var(--color-grey-50)] place-content-center !px-5 md:!px-0 gap-8 bg-grey-50 !overflow-hidden">
      <Logo />
      <Heading as="h4">Log in to your account</Heading>
      <LoginForm />
    </main>
  );
}

export default Login;
