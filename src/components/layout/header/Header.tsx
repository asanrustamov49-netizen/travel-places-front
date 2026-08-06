"use client";
import Link from "next/link";
import Image from "next/image";
import scss from "./header.module.scss";
import { IoLocationSharp } from "react-icons/io5";
import { usePathname } from "next/navigation";
import UserAvatar from "@/components/ui/userAvatar/UserAvatar";

const isAuth = false; // заменить потом на токен

const Header = () => {
  const pathname = usePathname();
  return (
    <header className={scss.header}>
      <div className="container">
        <div className={scss.wrapper}>
          <Link href="/" className={scss.logo}>
            <div className={scss.logoIcon}>
              <span>
                <IoLocationSharp />
              </span>
            </div>
            <h2>
              Travel<span className={scss.span}>Places</span>
            </h2>
          </Link>

          <nav className={scss.nav}>
            <Link href="/" className={pathname === "/" ? scss.active : ""}>
              Home
            </Link>

            <Link
              href="/admin"
              className={pathname.startsWith("/admin") ? scss.active : ""}
            >
              Admin
            </Link>
          </nav>

          <div className={scss.actions}>
            {isAuth ? (
              <>
                <Link href="/create" className={scss.addBtn}>
                  + Add Place
                </Link>

                <Link href="/profile" className={scss.avatar}>
                  {/* <UserAvatar name={user.name} size="small" /> */}
                </Link>
              </>
            ) : (
              <>
                <Link href="/login" className={scss.signIn}>
                  Sign In
                </Link>

                <Link href="/register" className={scss.signUp}>
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
