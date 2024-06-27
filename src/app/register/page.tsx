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

const formSchema = z.object({
  fullName: z.string(),
  birthDate: z.string(),
  address: z.string(),
  username: z.string(),
  password: z.string(),
  confirmPassword: z.string(),
});

export default function Register() {
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      address: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setSubmitError(null);
    setSubmitSuccess(false);

    if (values.password !== values.confirmPassword) {
      setSubmitError("Password yang diketik tidak sama.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", values, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setSubmitSuccess(true);
      setSubmitError(null);

      form.reset();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setSubmitError(error.response.data.body.message);
      }
      setSubmitSuccess(false);
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
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <AuthInput placeholder="Nama Lengkap" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="birthDate"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <AuthInput
                      placeholder="Tanggal Lahir"
                      onFocus={(e) => { e.currentTarget.type = 'date'; }}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <AuthInput placeholder="Alamat" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <AuthInput type="password" placeholder="Masukkan Ulang Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {submitError && <p className="text-red-700 font-bold font-dmSans text-center pt-4">{submitError}</p>}
          {submitSuccess && <p className="text-cckDarkBrown font-bold font-dmSans text-center pt-4">Registrasi berhasil! Silahkan <Link className="text-blue-700 font-semibold" href="./login">Login</Link></p>}
          
          <Button type="submit" className="border border-cckDarkGreen font-dmSans bg-cckBrown w-[325px] my-4 py-6 font-normal hover:brightness-90 transition-all">
            {submitting ? "Sedang register..." : "Register"}
          </Button>
        </form>
      </Form>

      <p className="text-sm">Sudah punya akun? <Link className="text-blue-700 font-semibold" href="./login">Login</Link></p>
      </main>
  );
}
