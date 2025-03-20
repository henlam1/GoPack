import { useForm } from "react-hook-form";
import {
  categorySchema,
  CategoryFormFields,
  categoryDefaults,
} from "../../models/zod/categorySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCategory } from "../../services/api/categories";

export default function CategoryForm({packingListId}: {packingListId: string}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormFields>({
    defaultValues: categoryDefaults,
    resolver: zodResolver(categorySchema),
  });

  async function onSubmit(data: CategoryFormFields) {
    try {
      const linkedData = {...data, packingList: packingListId}
      console.log(linkedData);
      const response = await createCategory(linkedData);
      console.log(response);
    } catch (error) {
      console.error("Error submitting ", error);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name")} type="text" placeholder="Category name" />
      {errors.name && <div className="text-red-500">{errors.name.message}</div>}
      <button>{isSubmitting ? "Loading..." : "Submit"}</button>
    </form>
  );
}
