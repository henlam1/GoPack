import { useForm } from "react-hook-form";
import {
  packingListSchema,
  PackingListFormFields,
  packingListDefaults,
} from "../../models/zod/packingListSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPackingList } from "../../services/api/packingLists";

export default function PackingListForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PackingListFormFields>({
    defaultValues: packingListDefaults,
    resolver: zodResolver(packingListSchema),
  });

  async function onSubmit(data: PackingListFormFields) {
    try {
      console.log(data);
      const response = await createPackingList(data);
      console.log(response);
    } catch (error) {
      console.error("Error submitting ", error);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name")} type="text" placeholder="Packing list name" />
      {errors.name && <div className="text-red-500">{errors.name.message}</div>}
      <button>{isSubmitting ? "Loading..." : "Submit"}</button>
    </form>
  );
}
