import { useForm } from "react-hook-form";

import { useSignup } from "./useSignup";
import Form from "../../shared/ui/Form/Form";
import FormRow from "../../shared/ui/Form/FormRow";
import Input from "../../shared/ui/Input/Input";
import Button from "../../shared/ui/Button/Button";

interface SignupFormData {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

function SignupForm() {
  const { createUser, isLoading } = useSignup();
  const { register, formState, handleSubmit, reset, getValues } =
    useForm<SignupFormData>();
  const { errors } = formState;

  function handleSignup({
    name,
    email,
    password,
    passwordConfirm,
  }: SignupFormData) {
    createUser(
      { name, email, password, passwordConfirm },
      {
        onSuccess: () => {
          reset();
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit(handleSignup)}>
      <FormRow label="Full name" error={errors?.name?.message}>
        <Input
          type="text"
          id="fullName"
          placeholder="eg: Mohamad Hachem"
          disabled={isLoading}
          {...register("name", { required: "Please enter your name" })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isLoading}
          placeholder="example@example.com"
          {...register("email", {
            required: "Please enter your email address",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          placeholder="Your password"
          disabled={isLoading}
          {...register("password", {
            required: "Please enter your password",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          placeholder="Repeat your password"
          disabled={isLoading}
          {...register("passwordConfirm", {
            required: "Please confirm your password",
            validate: (value) =>
              value === getValues().password || "Passwords need to match",
          })}
        />
      </FormRow>

      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          disabled={isLoading}
          onClick={() => reset()}
        >
          Cancel
        </Button>
        <Button disabled={isLoading}>Add new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
