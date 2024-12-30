import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const useEmailConfigInitForm = () => {
    const emailConfigSchema = z.object({
        newSubmission: z.boolean(),
        approval: z.boolean(),
        emailMe: z.boolean(),
        emails: z.array(
            z.string().email("Invalid email address").optional()
        ).max(10).optional()
    });

    type FormFields = z.infer<typeof emailConfigSchema>;

    const initialValues = {
        newSubmission: false,
        approval: false,
        emailMe: false,
        emails: []
    };

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<FormFields>({
        defaultValues: initialValues,
        resolver: zodResolver(emailConfigSchema),
    });

    return { control, handleSubmit, errors, isSubmitting, reset };
};

export default useEmailConfigInitForm;