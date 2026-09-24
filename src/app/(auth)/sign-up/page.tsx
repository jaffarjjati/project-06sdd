"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";
import InputText from "@/components/common/InputText";
import Button from "@/components/common/Button";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const SignOut = () => {
  type FieldName = "fullname" | "username" | "email" | "password";

  const router = useRouter();
  const signUp = useAuthStore((state) => state.register);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const signUpSchema = yup.object().shape({
    fullname: yup.string().required("Name is required"),
    username: yup.string().required("Username is required"),
    email: yup
      .string()
      .email("Email must be valid")
      .required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
    getFieldState,
  } = useForm({
    resolver: yupResolver(signUpSchema),
    mode: "onChange",
  });

  const getValidationState = (name: FieldName): boolean | undefined => {
    const { error, isTouched, isDirty } = getFieldState(name);
    if (!isTouched && !isDirty) return undefined;
    return !error;
  };

  const customRegister = (name: FieldName) => {
    const reg = register(name);
    return {
      ...reg,
      onBlur: async (e: React.FocusEvent<HTMLInputElement>) => {
        reg.onBlur(e);
        await trigger(name);
      },
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        reg.onChange(e);
        trigger(name);
      },
    };
  };

  const onSubmit = async (data: {
    fullname: string;
    username: string;
    email: string;
    password: string;
  }) => {
    setLoading(true);
    setError("");

    try {
      await signUp(data);
      router.push("/");
    } catch (e: any) {
      console.error("Login failed:", e);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-rose-700">
        01 — sign up
      </p>
      <h1 className="mt-3 mb-10 font-serif text-5xl md:text-6xl leading-none tracking-tight">
        Get a library <em className="text-rose-600">card</em>.
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-1">
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="flex flex-col sm:flex-row sm:gap-2">
          <div className="flex-1 py-1">
            <h3 className="font-mono text-xs uppercase tracking-widest text-rose-900/70 py-2 px-3">
              name
            </h3>
            <InputText
              {...customRegister("fullname")}
              name="fullname"
              placeholder="name"
              isValid={getValidationState("fullname")}
              errorMessage={errors.fullname?.message}
            />
          </div>
          <div className="flex-1 py-1">
            <h3 className="font-mono text-xs uppercase tracking-widest text-rose-900/70 py-2 px-3">
              username
            </h3>
            <InputText
              {...customRegister("username")}
              name="username"
              placeholder="username"
              isValid={getValidationState("username")}
              errorMessage={errors.username?.message}
            />
          </div>
        </div>
        <div className="py-1">
          <h3 className="font-mono text-xs uppercase tracking-widest text-rose-900/70 py-2 px-3">
            email
          </h3>
          <InputText
            {...customRegister("email")}
            name="email"
            placeholder="email"
            isValid={getValidationState("email")}
            errorMessage={errors.email?.message}
          />
        </div>
        <div className="py-1">
          <h3 className="font-mono text-xs uppercase tracking-widest text-rose-900/70 py-2 px-3">
            password
          </h3>
          <InputText
            {...customRegister("password")}
            type="password"
            name="password"
            placeholder="password"
            isValid={getValidationState("password")}
            errorMessage={errors.password?.message}
          />
        </div>

        <div className="flex flex-col py-2">
          <div className="flex justify-center items-center">
            <Button
              className="rounded-full w-full py-3! hover:bg-rose-600! hover:-rotate-1 transition-all!"
              color="black"
              type="submit"
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignOut;
