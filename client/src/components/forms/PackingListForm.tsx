import { useForm } from "react-hook-form";
import {
  packingListSchema,
  PackingListFormFields,
  packingListDefaults,
} from "../../models/zod/packingListSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPackingListAPI } from "../../services/api/packingLists";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import privateRoutes from "../../routes/privateRoutes";

export default function PackingListForm({ userId }: { userId: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PackingListFormFields>({
    defaultValues: packingListDefaults,
    resolver: zodResolver(packingListSchema),
  });

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: createPackingListAPI,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["packingLists"] });
      console.log(data);
      navigate(privateRoutes.packingLists.details(data._id));
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
