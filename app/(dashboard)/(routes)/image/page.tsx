"use client";
import * as z from "zod";
import Heading from "@/components/heading";
import { cn } from "@/lib/utils";
import { ImageIcon, MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { amountOptions, formSchema } from "./constants";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";
import Empty from "@/components/empty";
import Loader from "@/components/loader";
import { useState } from "react";
import { Select, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ImagePage() {
  const router = useRouter();
  const [images, setImages] = useState([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      amount: "1",
      resolution: "512x512"
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setImages([]);
      const response = await axios.post("/api/image", values);

      const urls = response.data.map((image: { url: string }) => image.url);

      setImages(urls);

      form.reset();
    } catch (error) {
      // TODO Open Pro Modal
      console.log(error);
    } finally {
      router.refresh();
    }
  };

  return (
    <div className="mb-8 space-y-4">
      <Heading
        title="Image Genaration"
        description="Turn your prompt into an image"
        icon={ImageIcon}
        iconColor="text-pink-700"
        bgColor="bg-pink-700/10"
      />
      <div className="px-4 md:px-20 lg:px-32 space-y-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="rounded-lg border w-full p-4 px-3 md:px-6
            focus-within:shadow-sm grid grid-cols-12 gap-2"
          >
            <FormField
              name="prompt"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-10">
                  <FormControl className="m-0 p-0">
                    <input
                      {...field}
                      type="text"
                      className="
                    border-10 outline-none focus-visible:ring-0
                    focus-visible:ring-transparent"
                      disabled={isLoading}
                      placeholder="A picture of a horse in Swiss alps"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-2">
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    values={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} />                        
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {amountOptions}
                    </SelectContent>

                  </Select>
                </FormItem>
              )}
            />
            <Button
              className="col-span-12 lg:col-span-2 w-full"
              disabled={isLoading}
            >
              Generate
            </Button> 
          </form>
        </Form>

        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-20">
              <Loader />
            </div>
          )}

          {images.length === 0 && !isLoading && (
            <div>
              <Empty label="No images generated" />
            </div>
          )}
          {images.map((image: any, index) => (
            <div>Images will be rendered here</div>
          ))}
        </div>
      </div>
    </div>
  );
}
