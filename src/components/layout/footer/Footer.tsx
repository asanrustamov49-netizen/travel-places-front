import Link from "next/link";
import scss from "./footer.module.scss";
import { IoLocationSharp } from "react-icons/io5";

const Footer = () => {
  return (
    <footer className={scss.container}>
      <div className="container">
        <div className={scss.mainContainer}>
          <div className={scss.top}>
            <div className={scss.brand}>
              <Link href="/" className={scss.logo}>
                <span className={scss.logoIcon}>
                  <IoLocationSharp />
                </span>
                <h2>
                  Travel<span>Places</span>
                </h2>
              </Link>
              <p>
                Discover and share the world's most
                <br />
                beautiful travel destinations.
              </p>
            </div>
            <div className={scss.links}>
              <div className={scss.column}>
                <h3>EXPLORE</h3>
                <Link href="/#browse">Browse Places</Link>
                <Link href="/add">Add a Place</Link>
              </div>
              <div className={scss.column}>
                <h3>ACCOUNT</h3>
                <Link href="/login">Sign In</Link>
                <Link href="/register">Sign Up</Link>
                <Link href="/profile">Profile</Link>
              </div>
              <div className={scss.column}>
                <h3>ADMIN</h3>
                <Link href="/admin">Dashboard</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={scss.bottom}>
        <p>© 2025 TravelPlaces. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
