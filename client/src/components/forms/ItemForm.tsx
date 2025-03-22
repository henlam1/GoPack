import { useForm } from "react-hook-form";
import {
  itemSchema,
  ItemFormFields,
  itemDefaults,
} from "../../models/zod/itemSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { createItem } from "../../services/api/items";

export default function ItemForm({categoryId}: {categoryId: string}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ItemFormFields>({
    defaultValues: itemDefaults,
    resolver: zodResolver(itemSchema),
  });

  async function onSubmit(data: ItemFormFields) {
    try {
      const linkedData = {...data, category: categoryId}
      console.log(linkedData);
      const response = await createItem(linkedData);
      console.log(response);
    } catch (error) {
      console.error("Error submitting ", error);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("packed")} type="checkbox" />
      {errors.packed && (
        <div className="text-red-500">{errors.packed.message}</div>
      )}
      <input {...register("name")} type="text" placeholder="Item name" />
      {errors.name && <div className="text-red-500">{errors.name.message}</div>}
      <input {...register("quantity")} type="number" />
      {errors.quantity && (
        <div className="text-red-500">{errors.quantity.message}</div>
      )}
      <button>{isSubmitting ? "Loading..." : "Submit"}</button>
    </form>
  );
}
