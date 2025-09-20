import { useForm } from "react-hook-form";

import FormRow from "../../shared/ui/Form/FormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";
import Form from "../../shared/ui/Form/Form";
import Input from "../../shared/ui/Input/Input";
import Textarea from "../../shared/ui/TextArea/Textarea";
import FileInput from "../../shared/ui/FileInput/FileInput";
import Button from "../../shared/ui/Button/Button";
import type { Cabin } from "./CabinRow";

interface CreateCabinFormData {
  cabinName: string;
  maxCapacity: number;
  price: number;
  discount: number;
  description: string;
  cabinImage: FileList;
}

interface CreateCabinFormProps {
  cabinToEdit?: Partial<Cabin>;
  setShowEditForm?: React.Dispatch<React.SetStateAction<boolean>>;
  setShowCreateForm?: React.Dispatch<React.SetStateAction<boolean>>;
}

function CreateCabinForm({
  cabinToEdit = {},
  setShowEditForm,
  setShowCreateForm,
}: CreateCabinFormProps) {
  const { isAdding, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();
  const { _id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const defaultValues = isEditSession
    ? {
        cabinName: editValues.cabinName ?? "",
        maxCapacity: editValues.maxCapacity ?? 0,
        price: editValues.price ?? 0,
        discount: editValues.discount ?? 0,
        description: editValues.description ?? "",
      }
    : {};

  const { register, handleSubmit, reset, getValues, formState } =
    useForm<CreateCabinFormData>({
      mode: "onChange",
      defaultValues: defaultValues,
    });

  const { errors } = formState;

  const isWorking = isAdding || isEditing;

  // Form submit handler fn!
  function onSubmit(data: CreateCabinFormData) {
    const formData = new FormData();

    formData.append("cabinName", data.cabinName);
    formData.append("maxCapacity", data.maxCapacity.toString());
    formData.append("price", data.price.toString());
    formData.append("discount", data.discount.toString());
    formData.append("description", data.description);

    if (data.cabinImage && data.cabinImage.length > 0) {
      const imageFile = data.cabinImage[0];
      if (imageFile) {
        formData.append("cabinImage", imageFile);
      }
    }

    if (isEditSession)
      editCabin(
        { formData, id: editId },
        {
          onSuccess: () => {
            setShowEditForm?.(false);
            reset();
          },
        }
      );
    else
      createCabin(
        { formData },
        {
          onSuccess: () => {
            setShowCreateForm?.(false);
            reset();
          },
        }
      );
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={!isEditSession ? "modal" : "regular"}
    >
      {isEditSession && (
        <button
          onClick={() => setShowEditForm?.(false)}
          className="absolute top-[0.3rem] ![color:var(--color-grey-600)] right-12 !text-[3.5rem]"
          type="button"
        >
          &times;
        </button>
      )}
      <FormRow label="Cabin name" error={errors?.cabinName?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("cabinName", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>
      <FormRow label="Price" error={errors?.price?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("price", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              Number(value) <= Number(getValues().price) ||
              "Discount should be less than regular price",
          })}
        />
      </FormRow>
      <FormRow label="Description" error={errors?.description?.message}>
        <Textarea
          id="description"
          disabled={isWorking}
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow label="Cabin photo">
        <FileInput id="image" accept="image/*" {...register("cabinImage")} />
      </FormRow>
      <FormRow>
        <Button variation="secondary" type="reset" onClick={() => reset()}>
          Reset
        </Button>
        <Button disabled={isWorking} type="submit">
          {isEditSession ? "Edit cabin" : "Create new cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
