"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import scss from "./login.module.scss";
import { IoLocationSharp } from "react-icons/io5";
import { useLogin } from "@/hooks/functions/auth/useLogin";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/validation/auth.validate";

interface LoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const { mutate, isPending } = useLogin();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });
  const onSubmit = (data: LoginForm) => {
    mutate(data);
    reset();
  };
  return (
    <section className={scss.container}>
      <div className={scss.leftSide}>
        <div className={scss.quote}>
          <div className={scss.quoteIcon}>
            <span>
              <IoLocationSharp />
            </span>
          </div>
          <h2>
            "The world is a book, and those who do not travel read only one
            page."
          </h2>
          <p>— Saint Augustine</p>
        </div>
      </div>
      <div className={scss.rightSide}>
        <div className={scss.formWrapper}>
          <Link href="/" className={scss.logo}>
            <div className={scss.logoIcon}>
              <span>
                <IoLocationSharp />
              </span>
            </div>
            <span>
              Travel<span>Places</span>
            </span>
          </Link>
          <div className={scss.heading}>
            <h1>Welcome back</h1>
            <p>Sign in to your account to continue.</p>
          </div>
          <form className={scss.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={scss.field}>
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                type="email"
                placeholder="sofia@example.com"
                {...register("email")}
              />
              {errors.email && (
                <span className={scss.error}>{errors.email.message}</span>
              )}
            </div>
            <div className={scss.field}>
              <div className={scss.passwordLabel}>
                <label htmlFor="password">Password</label>
                <Link href="/forgot-password">Forgot password?</Link>
              </div>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                {...register("password")}
              />
              {errors.password && (
                <span className={scss.error}>{errors.password.message}</span>
              )}
            </div>
            <button type="submit" disabled={isPending} className={scss.submit}>
              {isPending ? "Signing in..." : "Sign In"}
            </button>
          </form>
          <p className={scss.registerText}>
            Don&apos;t have an account? <Link href="/register">Sign Up</Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
