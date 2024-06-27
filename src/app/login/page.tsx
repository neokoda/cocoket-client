"use client"

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { AuthInput } from "@/components/ui/auth/authInput";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export default function Login() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setSubmitError(null);
    setSubmitting(true);
    try {
      const response = await axios.post("https://cocoket-server-production.up.railway.app/api/auth/login", values, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      localStorage.setItem("accessToken", response.data.body.body.accessToken);
      router.push("../.");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setSubmitError(error.response.data.body.message);
      }
    } finally {
      setSubmitting(false); 
    }
  }

  return (
    <main className="flex flex-col h-screen items-center justify-center">
      <Image src="/images/logo.png" alt="Cocoket Logo" height={126} width={138} className="pb-10" />
      <h1 className="font-jua text-cckDarkBrown text-5xl">Halo cocomate!</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-center justify-center">
          <div className="space-y-3 pt-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <AuthInput placeholder="Username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <AuthInput type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {submitError && <p className="text-red-700 font-bold font-dmSans text-center pt-4">{submitError}</p>}
          
          <Button type="submit" className="border border-cckDarkGreen font-dmSans bg-cckBrown w-[325px] my-4 py-6 font-normal hover:brightness-90 transition-all">
            {submitting ? "Sedang login..." : "Login"}
          </Button>
        </form>
      </Form>

      <p className="text-sm">Belum punya akun? <Link className="text-blue-700 font-semibold" href="./register">Daftar Sekarang</Link></p>
      </main>
  );
}
