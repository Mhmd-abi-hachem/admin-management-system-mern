import { useState } from "react";
import { useUser } from "./useUser";
import { useUpdateUser } from "./useUpdateUser";
import Form from "../../shared/ui/Form/Form";
import Input from "../../shared/ui/Input/Input";
import Button from "../../shared/ui/Button/Button";
import FormRow from "../../shared/ui/Form/FormRow";
import FileInput from "../../shared/ui/FileInput/FileInput";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

function UpdateUserDataForm() {
  const { user } = useUser();
  const [name, setName] = useState(user.user.name);
  const [avatar, setAvatar] = useState<File | null>(null);
  const { updateUser, isUpdating } = useUpdateUser();
  const queryClient = useQueryClient();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name) return;

    const formData = new FormData();
    formData.append("name", name);
    if (avatar) formData.append("avatar", avatar);

    updateUser(
      { formData },
      {
        onSuccess: () => {
          setAvatar(null);
          (e.target as HTMLFormElement).reset();
          queryClient.invalidateQueries({ queryKey: ["user"] });
          toast.success("User data updated successfully!");
        },
      }
    );
  }

  function handleCancel() {
    setName(user.user.name);
    setAvatar(null);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={user.user.email} disabled />
      </FormRow>

      <FormRow label="Full name">
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="fullName"
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow label="Avatar image">
        <FileInput
          id="avatar"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files?.[0] || null)}
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow>
        <Button
          type="reset"
          variation="secondary"
          disabled={isUpdating}
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button disabled={isUpdating}>Update account</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
