import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useFormAnalytics } from "@/analytics/hooks";
import { questionSchema, submitQuestion, type QuestionRequest } from "@/lib/question";

import { Cta } from "./primitives";

const fieldClass =
  "h-[52px] w-full rounded-[10px] border border-input bg-background px-4 text-[0.9375rem] text-foreground transition-colors duration-200 placeholder:text-muted-foreground/70 focus:border-primary aria-[invalid=true]:border-destructive";

export function QuestionDialog({
  open,
  onOpenChange,
  source = "pricing",
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  source?: string;
}) {
  const [sent, setSent] = useState(false);
  const analytics = useFormAnalytics("ask_question_form", { source, open });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<QuestionRequest>({ resolver: zodResolver(questionSchema), mode: "onBlur" });

  useEffect(() => {
    if (!open) {
      setSent(false);
      reset();
    }
  }, [open, reset]);

  const onSubmit = async (values: QuestionRequest) => {
    const result = await submitQuestion(values);
    if (!result.ok) {
      toast.error("Вопрос не отправлен", { description: result.message });
      return;
    }
    // fires only after the API confirms the submission — no field values sent
    analytics.onSubmitSuccess();
    reset();
    setSent(true);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-[14px] sm:max-w-[560px]">
        {sent ? (
          <div role="status" className="py-6">
            <CheckCircle2 className="h-8 w-8 text-primary" strokeWidth={1.5} aria-hidden="true" />
            <h3 className="mt-5 text-xl font-semibold">Спасибо. Вопрос получен.</h3>
            <p className="mt-3 text-[0.9375rem] leading-[1.7] text-muted-foreground">
              Мы ознакомимся с ситуацией и свяжемся с вами, если сможем быть полезны.
            </p>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="mt-7 text-[0.9375rem] font-medium text-primary underline-offset-4 transition-colors hover:underline"
            >
              Закрыть
            </button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-semibold">Задайте вопрос</DialogTitle>
              <DialogDescription className="text-[0.9375rem] leading-[1.7]">
                Опишите вашу ситуацию или конкретный вопрос. Мы посмотрим на задачу и подскажем, с
                чего стоит начать.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-2 grid gap-5">
              <div>
                <label htmlFor="q-name" className="block text-sm font-medium">
                  Имя
                </label>
                <input
                  id="q-name"
                  className={`mt-2 ${fieldClass}`}
                  placeholder="Алексей"
                  aria-invalid={!!errors.name}
                  {...register("name")}
                  {...analytics.fieldProps("name", "text")}
                />
                {errors.name ? (
                  <p role="alert" className="mt-2 text-sm text-destructive">
                    {errors.name.message}
                  </p>
                ) : null}
              </div>

              <div>
                <label htmlFor="q-contact" className="block text-sm font-medium">
                  Контакт для связи
                </label>
                <input
                  id="q-contact"
                  className={`mt-2 ${fieldClass}`}
                  placeholder="E-mail, телефон или Telegram"
                  aria-invalid={!!errors.contact}
                  {...register("contact")}
                  {...analytics.fieldProps("contact", "text")}
                />
                {errors.contact ? (
                  <p role="alert" className="mt-2 text-sm text-destructive">
                    {errors.contact.message}
                  </p>
                ) : null}
              </div>

              <div>
                <label htmlFor="q-question" className="block text-sm font-medium">
                  Ваш вопрос
                </label>
                <textarea
                  id="q-question"
                  rows={4}
                  className="mt-2 w-full rounded-[10px] border border-input bg-background px-4 py-3 text-[0.9375rem] leading-[1.7] transition-colors duration-200 placeholder:text-muted-foreground/70 focus:border-primary aria-[invalid=true]:border-destructive"
                  placeholder="Ситуация и вопрос, на который нужен взгляд со стороны"
                  aria-invalid={!!errors.question}
                  {...register("question")}
                  {...analytics.fieldProps("question", "textarea")}
                />
                {errors.question ? (
                  <p role="alert" className="mt-2 text-sm text-destructive">
                    {errors.question.message}
                  </p>
                ) : null}
              </div>

              <div>
                <label htmlFor="q-url" className="block text-sm font-medium">
                  Ссылка на продукт
                  <span className="ml-2 font-normal text-muted-foreground">(необязательно)</span>
                </label>
                <input
                  id="q-url"
                  className={`mt-2 ${fieldClass}`}
                  placeholder="https://"
                  aria-invalid={!!errors.productUrl}
                  {...register("productUrl")}
                  {...analytics.fieldProps("product_url", "url")}
                />
                {errors.productUrl ? (
                  <p role="alert" className="mt-2 text-sm text-destructive">
                    {errors.productUrl.message}
                  </p>
                ) : null}
              </div>

              <Cta type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Отправляем…" : "Отправить вопрос"}
              </Cta>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
