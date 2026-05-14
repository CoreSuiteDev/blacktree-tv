"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

import { ZCAuthLogin, ZTAuthLogin } from "@/types/zod/auth";

export const LoginForm = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const form = useForm<ZTAuthLogin>({
    resolver: zodResolver(ZCAuthLogin),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  function onSubmit(data: ZTAuthLogin) {
    console.log("Login Form Values:", data);

    toast("Login Success", {
      position: "bottom-right",
    });
  }

  return (
    <div className="w-full flex items-center justify-center px-4">
      <Card className="w-full max-w-[440px] border border-[#FFFFFF0D] bg-[#141414] text-white shadow-2xl rounded-2xl">
        <CardHeader className="space-y-3 pb-6 pt-8">
          <CardTitle className="text-center text-3xl font-bold tracking-tight">
            Sign In
          </CardTitle>

          <CardDescription className="text-center text-sm text-zinc-400">
            Experience premium cultural storytelling.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            id="form-rhf-demo"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5"
          >
            <FieldGroup className="space-y-2">
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="space-y-2"
                  >
                    <FieldLabel
                      htmlFor="form-email"
                      className="text-sm font-medium text-zinc-300"
                    >
                      Email Address
                    </FieldLabel>

                    <Input
                      {...field}
                      id="form-email"
                      type="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                      aria-invalid={fieldState.invalid}
                      className="h-12 rounded-lg border bg-transparent! border-[#FFFFFF1A] px-4 text-white placeholder:text-zinc-500 focus-visible:ring-1 focus-visible:ring-[#FFFFFF1A]"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="space-y-2"
                  >
                    <FieldLabel
                      htmlFor="form-password"
                      className="text-sm font-medium text-zinc-300"
                    >
                      Password
                    </FieldLabel>

                    <div className="relative">
                      <Input
                        {...field}
                        id="form-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        autoComplete="current-password"
                        aria-invalid={fieldState.invalid}
                        className={`h-12 rounded-lg border border-[#FFFFFF1A] bg-transparent! px-4 pr-12 text-white placeholder:text-zinc-500 focus-visible:ring-1 focus-visible:ring-[#FFFFFF1A] ${
                          !showPassword && field.value
                            ? "font-mono tracking-[0.25em]"
                            : ""
                        }`}
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 transition-colors hover:text-zinc-300"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            <FieldGroup className="space-y-1">
              <div className="flex items-center justify-between gap-4">
                <Controller
                  name="rememberMe"
                  control={form.control}
                  render={({ field }) => (
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="form-rememberMe"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="border-zinc-600 data-[state=checked]:border-[#E50914] data-[state=checked]:bg-[#E50914]"
                      />

                      <label
                        htmlFor="form-rememberMe"
                        className="cursor-pointer text-sm text-zinc-300"
                      >
                        Remember me
                      </label>
                    </div>
                  )}
                />

                <Link
                  href="/forgot-password"
                  className="text-sm text-zinc-500 underline underline-offset-4 transition-colors hover:text-zinc-300"
                >
                  Forgot Password?
                </Link>
              </div>

              <Button
                type="submit"
                className="mt-2 h-12 w-full rounded-lg bg-[#E50914] text-sm font-semibold text-white transition hover:bg-[#c40812]"
              >
                Sign In
              </Button>
            </FieldGroup>
          </form>
        </CardContent>

        <CardFooter className="flex justify-center pb-8 pt-2">
          <p className="text-center text-sm text-zinc-400">
            Don&apos;t have an account?
            <Link
              href="/register"
              className="ml-1 font-medium text-[#E50914] transition-colors hover:text-[#ff2d37]"
            >
              Sign Up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};
