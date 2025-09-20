import { useState } from "react";

import Button from "../../shared/ui/Button/Button";
import { useLogin } from "./useLogin";
import Form from "../../shared/ui/Form/Form";
import FormRowVertical from "../../shared/ui/Form/FormRowVertical";
import Input from "../../shared/ui/Input/Input";
import SpinnerMini from "../../shared/ui/Spinners/SpinnerMini";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser, isLoading } = useLogin();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email || !password) return;
    loginUser(
      { email, password },
      {
        onSuccess: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>

      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>

      <FormRowVertical>
        <Button size="large" disabled={isLoading} type="submit">
          {!isLoading ? (
            "Log in"
          ) : (
            <div className="flex justify-center">
              <SpinnerMini />
            </div>
          )}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
