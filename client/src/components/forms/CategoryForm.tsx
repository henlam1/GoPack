import { useForm } from "react-hook-form";
import {
  categorySchema,
  CategoryFormFields,
  categoryDefaults,
} from "../../models/zod/categorySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCategoryMutations } from "../../hooks/useCategoryMutations";

export default function CategoryForm({
  packingListId,
}: {
  packingListId: string;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormFields>({
    defaultValues: categoryDefaults,
    resolver: zodResolver(categorySchema),
  });

  // Hooks to manage item CRUD
  const { createCategory } = useCategoryMutations(packingListId);

  async function onSubmit(data: CategoryFormFields) {
    const linkedData = { ...data, packingList: packingListId };
    createCategory.mutate(linkedData);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name")} type="text" placeholder="Category name" />
      {errors.name && <div className="text-red-500">{errors.name.message}</div>}
      <button>{isSubmitting ? "Loading..." : "Submit"}</button>
    </form>
  );
}
