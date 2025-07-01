import { useForm } from "react-hook-form";
import {
  packingListSchema,
  PackingListFormFields,
  packingListDefaults,
} from "../../models/zod/packingListSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import privateRoutes from "../../routes/privateRoutes";
import { usePackingListMutations } from "../../hooks/usePackingListMutations";

export default function PackingListForm({ userId }: { userId: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PackingListFormFields>({
    defaultValues: packingListDefaults,
    resolver: zodResolver(packingListSchema),
  });

  // Hooks to manage item CRUD
  const { createPackingList } = usePackingListMutations(userId);
  const navigate = useNavigate();

  async function onSubmit(data: PackingListFormFields) {
    const linkedData = { ...data, user: userId };
    createPackingList.mutate(linkedData, { onSuccess: (data) => {
      console.log(data);
      navigate(privateRoutes.packingLists.details(data._id));
    }});
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
