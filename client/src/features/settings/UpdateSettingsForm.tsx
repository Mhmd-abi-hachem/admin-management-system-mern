import Spinner from "../../shared/ui/Spinners/Spinner";
import Form from "../../shared/ui/Form/Form";
import FormRow from "../../shared/ui/Form/FormRow";
import Input from "../../shared/ui/Input/Input";
import { useSettings } from "./useSettings";
import { useUpdateSettings } from "./useupdateSettings";

function UpdateSettingsForm() {
  const { settings, isLoading } = useSettings();
  const { isUpdating, updateSetting } = useUpdateSettings();

  if (isLoading) return <Spinner />;

  const {
    _id: updateId,
    minBookingLength,
    maxBookingLength,
    maxGuestsPerBooking,
    breakfastPrice,
  } = settings;

  function handleUpdate(e: React.FocusEvent<HTMLInputElement>, field: string) {
    const { value } = e.target;

    if (!value) return;

    // check if the value has changed
    const currentValue = settings[field];

    if (Number(value) === Number(currentValue)) {
      return;
    }

    updateSetting({
      updatedSettingData: { [field]: Number(value) },
      id: updateId,
    });
  }

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "minBookingLength")}
        />
      </FormRow>

      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "maxBookingLength")}
        />
      </FormRow>

      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestsPerBooking}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "maxGuestsPerBooking")}
        />
      </FormRow>

      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "breakfastPrice")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
