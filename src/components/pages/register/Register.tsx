"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import scss from "./register.module.scss";
import { IoLocationSharp } from "react-icons/io5";
import { useRegister } from "@/hooks/auth/useRegister";

interface RegisterForm {
  name: string;
  email: string;
  password: string;
}

const Register = () => {
  const { mutate, isPending } = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>();

  const onSubmit = (data: RegisterForm) => {
    mutate(data);
  };

  return (
    <section className={scss.container}>
      {/* LEFT SIDE */}
      <div className={scss.leftSide}>
        <div className={scss.overlay} />

        <div className={scss.leftContent}>
          <h2>
            Join thousands of travelers sharing the world&apos;s most beautiful
            destinations.
          </h2>

          <div className={scss.stats}>
            <div className={scss.stat}>
              <span>8+</span>
              <p>Destinations</p>
            </div>

            <div className={scss.stat}>
              <span>12</span>
              <p>Countries</p>
            </div>

            <div className={scss.stat}>
              <span>500+</span>
              <p>Members</p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className={scss.rightSide}>
        <div className={scss.formWrapper}>
          {/* LOGO */}
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
            <h1>Create an account</h1>

            <p>Start sharing your favorite travel destinations.</p>
          </div>

          <form className={scss.form} onSubmit={handleSubmit(onSubmit)}>
            {/* NAME */}
            <div className={scss.field}>
              <label htmlFor="name">Full Name</label>

              <input
                id="name"
                type="text"
                placeholder="Sofia Nakamura"
                {...register("name")}
              />

              {errors.name && (
                <span className={scss.error}>{errors.name.message}</span>
              )}
            </div>

            {/* EMAIL */}
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

            {/* PASSWORD */}
            <div className={scss.field}>
              <label htmlFor="password">Password</label>

              <input
                id="password"
                type="password"
                placeholder="At least 8 characters"
                {...register("password")}
              />

              {errors.password && (
                <span className={scss.error}>{errors.password.message}</span>
              )}
            </div>

            <button type="submit" disabled={isPending} className={scss.submit}>
              {isPending ? "Creating..." : "Create Account"}
            </button>
          </form>

          <p className={scss.loginText}>
            Already have an account? <Link href="/login">Sign In</Link>
          </p>

          <p className={scss.terms}>
            By creating an account you agree to our{" "}
            <Link href="#">Terms of Service</Link> and{" "}
            <Link href="#">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;
