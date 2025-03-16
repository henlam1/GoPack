import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { genHexString } from "../../utils/stringHelpers";
import { createItem } from "../../services/api/items";

const itemSchema = z.object({
  name: z.string().min(1).max(30),
  quantity: z.coerce.number().min(1).max(99),
  packed: z.boolean(),
  category: z.string().default(genHexString(24))
});

type FormFields = z.infer<typeof itemSchema>;

export default function ItemForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      quantity: 1,
      packed: false,
    },
    resolver: zodResolver(itemSchema),
  });

  async function onSubmit(data: FormFields) {
    try {
      console.log(data);
      const response = await createItem(data);
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
