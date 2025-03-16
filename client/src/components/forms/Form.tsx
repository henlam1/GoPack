import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// THIS IS AN EXAMPLE FORM TO LEARN THE FOLLOWING LIBRARIES
// REACT-HOOK-FORM, HOOKFORM-RESOLVERS, ZOD

const schema = z.object({
  name: z.string().min(1).max(30),
  quantity: z.coerce.number().min(1).max(99),
  packed: z.boolean(),
});

type FormFields = z.infer<typeof schema>;

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      quantity: 1,
      packed: false,
    },
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: FormFields) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(data);
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
