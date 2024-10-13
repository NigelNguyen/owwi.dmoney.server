import { Controller, useForm } from "react-hook-form";
import VerticalField from "../../../components/atoms/VerticalField";
import CInput from "../../../components/atoms/Input";
import CButton from "../../../components/atoms/CButton";
import { TPartnerForm, partnerSchema } from "../types";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

const PartnerForm = ({
  submitHandler,
  initValues,
  isPending,
  submitLabel,
}: {
  submitHandler: (data: TPartnerForm) => void;
  initValues: TPartnerForm;
  isPending?: boolean;
  submitLabel: string;
}) => {
  const { control, handleSubmit, reset } = useForm<TPartnerForm>({
    resolver: zodResolver(partnerSchema),
    defaultValues: initValues,
  });

  useEffect(() => {
    if (initValues) {
      reset(initValues);
    }
  }, [initValues]);

  return (
    <form
      onReset={() => reset()}
      onSubmit={handleSubmit((data) => {
        reset();
        submitHandler(data);
      })}
    >
      <div className="flex flex-col gap-4">
        <VerticalField label="Partner Name">
          <Controller
            control={control}
            name="name"
            render={({ field: { value, onChange }, fieldState: { error } }) => {
              return (
                <CInput
                  value={value.toString()}
                  onChange={onChange}
                  errorMessage={error?.message}
                />
              );
            }}
          />
        </VerticalField>
        <VerticalField label="Description">
          <Controller
            control={control}
            name="description"
            render={({
              field: { value = "", onChange },
              fieldState: { error },
            }) => {
              return (
                <CInput
                  value={value}
                  onChange={onChange}
                  errorMessage={error?.message}
                />
              );
            }}
          />
        </VerticalField>
      </div>
      <div className="flex gap-4">
        <CButton
          label={submitLabel}
          className="mt-6"
          type="submit"
          disabled={isPending}
        />
        <CButton
          label="Reset"
          className="mt-6"
          type="reset"
          variant="outlined"
          disabled={isPending}
        />
      </div>
    </form>
  );
};

export default PartnerForm;
