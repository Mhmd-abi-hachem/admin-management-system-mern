import { useForm } from "react-hook-form";
import Button from "../../shared/ui/Button/Button";
import Form from "../../shared/ui/Form/Form";
import FormRow from "../../shared/ui/Form/FormRow";
import Input from "../../shared/ui/Input/Input";
import { useUpdatePassword } from "./useUpdatePassword";

interface UpdatePasswordFormData {
  password: string;
  passwordConfirm: string;
}

function UpdatePasswordForm() {
  const { updateUserPassword, isUpdating } = useUpdatePassword();
  const { register, handleSubmit, formState, getValues, reset } =
    useForm<UpdatePasswordFormData>();
  const { errors } = formState;

  function onSubmit({ password, passwordConfirm }: UpdatePasswordFormData) {
    updateUserPassword(
      { password, passwordConfirm },
      { onSuccess: () => reset() }
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          disabled={isUpdating}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Confirm password"
        error={errors?.passwordConfirm?.message}
      >
        <Input
          type="password"
          autoComplete="new-password"
          id="passwordConfirm"
          disabled={isUpdating}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              getValues().password === value || "Passwords need to match",
          })}
        />
      </FormRow>
      <FormRow>
        <Button onClick={() => reset()} type="reset" variation="secondary">
          Cancel
        </Button>
        <Button disabled={isUpdating} type="submit">
          Update password
        </Button>
      </FormRow>
    </Form>
  );
}

export default UpdatePasswordForm;
