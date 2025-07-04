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
    reset,
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
    reset();
  }

  return (
    <div className="mb-8">
      <form onSubmit={handleSubmit(onSubmit)} className="join">
        <input {...register("name")} type="text" placeholder="Packing List Name" className="input join-item" />
        <button className="btn btn-primary join-item">{isSubmitting ? "Loading..." : "Add New Packing List"}</button>
      </form>
      {errors.name && <p className="block text-error">{errors.name.message}</p>}
    </div>
  );
}
