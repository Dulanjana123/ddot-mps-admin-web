import { zodResolver } from "@hookform/resolvers/zod";
import { isEndDateLater } from "@utils/date-validation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const useWatchLockDetailInitForm = () => {
    const addWatchLockAreaSchema = z.object({
        category: z.string().min(1, "Category is required."),
        name: z
            .string()
            .min(1, "Name is required.")
            .max(50, "Maximum character length exceeds."),
        startDate: z.string().min(1, "Start date is required."),
        endDate: z.string().min(1, "End date is required."),
        areaDescription: z
            .string()
            .min(1, "Area description is required.")
            .max(100, "Maximum character length exceeds."),
        reason: z
            .string()
            .min(1, "Reason is required.")
            .max(1000, "Maximum character length exceeds."),
    })
        .refine((data) => { return isEndDateLater(data.startDate, data.endDate) }, {
            message: "End date must be later than the start date.",
            path: ['endDate']
        })

    type FormFields = z.infer<typeof addWatchLockAreaSchema>;

    const initialValues = {
        category: "",
        name: "",
        startDate: "",
        endDate: "",
        areaDescription: "",
        reason: "",
    };

    const {
        control,
        handleSubmit,
        getValues,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<FormFields>({
        defaultValues: initialValues,
        resolver: zodResolver(addWatchLockAreaSchema),
    });

    return { control, handleSubmit, getValues, errors, isSubmitting, reset };
};

export default useWatchLockDetailInitForm;