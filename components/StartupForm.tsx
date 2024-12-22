"use client";

import React, { useActionState, useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Send } from "lucide-react";
import { title } from "process";
import { link } from "fs";
import { formSchema } from "@/lib/validation";
import { unknown, z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/router";

const StartupForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pitch, setPitch] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        link: formData.get("link") as string,
        pitch,
      };

      await formSchema.parseAsync(formValues);

      console.log(formValues);

      //const result = await createIdea(prevState, formData, pitch);

      //if (result.status == "SUCCESS") {
      //toast({
      //title: "Success",
      //description: "Your schollarship has been created successfully",
      //});

      //router.push(`/startup/${result._id}`);
      //}

      return result;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        setErrors(fieldErrors as unknown as Record<string, string>);

        toast({
          title: "Error",
          description: "Please check your inputs and try again",
          variant: "destructive",
        });

        return { ...prevState, error: "Validation failed", status: "ERROR" };
      }
      toast({
        title: "Error",
        description: "An unexpected error occured",
        variant: "destructive",
      });

      return {
        ...prevState,
        error: "An unexpected error occured",
        status: "ERROR",
      };
    }
  };

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });

  return (
    <form action={formAction} className="startup-form">
      <div>
        <label className="startup-form__label" htmlFor="title">
          Title
        </label>
        <Input
          className="startup-form__input"
          id="title"
          name="title"
          required
          placeholder="Schollarship Title"
        />

        {errors.title && <p className="startup-form_error">{errors.title}</p>}
      </div>
      <div>
        <label htmlFor="description" className="startup-form__label">
          Description
        </label>
        <Textarea
          className="startup-form__textarea"
          id="description"
          name="description"
          required
          placeholder="Schollarship description"
        />

        {errors.description && (
          <p className="startup-form_error">{errors.description}</p>
        )}
      </div>
      <div>
        <label className="startup-form__label" htmlFor="category">
          Category
        </label>
        <Input
          className="startup-form__input"
          id="category"
          name="category"
          required
          placeholder="Schollarship category"
        />

        {errors.category && (
          <p className="startup-form_error">{errors.caregory}</p>
        )}
      </div>

      <div>
        <label className="startup-form__label" htmlFor="link">
          Image URL
        </label>
        <Input
          className="startup-form__input"
          id="link"
          name="link"
          required
          placeholder="Schollarship Image URL"
        />

        {errors.link && <p className="startup-form_error">{errors.link}</p>}
      </div>

      <div data-color-mode="light">
        <label className="startup-form__label" htmlFor="pitch">
          Pitch
        </label>

        <MDEditor
          value={pitch}
          onChange={(value) => setPitch(value as string)}
          id="pitch"
          preview="edit"
          height={300}
          style={{ borderRadius: 20, overflow: "hidden" }}
          textareaProps={{
            placeholder: "brief schollarship condition",
          }}
          previewOptions={{
            disallowedElements: ["style"],
          }}
        />

        {errors.pitch && <p className="startup-form_error">{errors.pitch}</p>}
      </div>

      <button
        type="submit"
        className="startup-form_btn text-white"
        disabled={isPending}
      >
        {isPending ? "Submitting..." : "Submit your Schollarship"}
        <Send className="size-6 ml-2" />
      </button>
    </form>
  );
};

export default StartupForm;
