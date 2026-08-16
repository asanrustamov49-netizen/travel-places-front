"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { IoLocationSharp } from "react-icons/io5";
import { Menu, X } from "lucide-react";
import scss from "./header.module.scss";
import UserAvatar from "@/components/ui/userAvatar/UserAvatar";
import { useAuth } from "@/hooks/functions/auth/useAuth";
import { useProfile } from "@/hooks/functions/auth/useProfile";

const Header = () => {
  const pathname = usePathname();
  const { isAuth } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: profile } = useProfile({
    enabled: isAuth,
  });
  return (
    <header className={scss.header}>
      <div className="container">
        <div className={scss.wrapper}>
          <Link
            href="/"
            className={scss.logo}
            onClick={() => setIsMenuOpen(false)}
          >
            <div className={scss.logoIcon}>
              <IoLocationSharp />
            </div>
            <h2>
              Travel<span>Places</span>
            </h2>
          </Link>
          <nav className={scss.nav}>
            <Link href="/" className={pathname === "/" ? scss.active : ""}>
              Home
            </Link>
            {isAuth && (
              <Link
                href="/admin"
                className={pathname.startsWith("/admin") ? scss.active : ""}
              >
                Admin
              </Link>
            )}
          </nav>
          <div className={scss.actions}>
            {isAuth ? (
              <>
                <Link href="/add" className={scss.addBtn}>
                  + Add Place
                </Link>
                <Link href="/profile" className={scss.avatar}>
                  {profile && <UserAvatar name={profile.name} />}
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
          <button
            type="button"
            className={scss.menuButton}
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
        <div
          className={`${scss.mobileMenu} ${
            isMenuOpen ? scss.mobileMenuOpen : ""
          }`}
        >
          <nav className={scss.mobileNav}>
            <Link
              href="/"
              className={pathname === "/" ? scss.active : ""}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            {isAuth && (
              <Link
                href="/admin"
                className={pathname.startsWith("/admin") ? scss.active : ""}
                onClick={() => setIsMenuOpen(false)}
              >
                Admin
              </Link>
            )}
          </nav>
          <div className={scss.mobileActions}>
            {isAuth ? (
              <>
                <Link
                  href="/add"
                  className={scss.addBtn}
                  onClick={() => setIsMenuOpen(false)}
                >
                  + Add Place
                </Link>
                <Link
                  href="/profile"
                  className={scss.mobileProfile}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className={scss.avatar}>
                    {profile && <UserAvatar name={profile.name} />}
                  </div>
                  <span>{profile?.name ?? "Profile"}</span>
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className={scss.signIn}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className={scss.signUp}
                  onClick={() => setIsMenuOpen(false)}
                >
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
