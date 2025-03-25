import { useForm } from "react-hook-form";
import {
  packingListSchema,
  PackingListFormFields,
  packingListDefaults,
} from "../../models/zod/packingListSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPackingList } from "../../services/api/packingLists";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function PackingListForm({ userId }: { userId: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PackingListFormFields>({
    defaultValues: packingListDefaults,
    resolver: zodResolver(packingListSchema),
  });

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: createPackingList,
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ["packingLists"] });
    },
  });

  async function onSubmit(data: PackingListFormFields) {
    const linkedData = { ...data, user: userId };
    mutate(linkedData);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("name")}
        type="text"
        placeholder="Packing list name"
      />
      {errors.name && <div className="text-red-500">{errors.name.message}</div>}
      <button>{isSubmitting ? "Loading..." : "Submit"}</button>
    </form>
  );
}
