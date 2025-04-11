import React from "react";
import Image from "next/image";
import styles from "./Header.module.scss";
import logo from "@/assets/logo.png";
import { UserCircle2 } from "lucide-react";

function Header() {
  return (
    <div className={styles.header}>
      <Image
        src={logo}
        alt="Logo do Instituto Patinhas"
        className={styles.logo}
      />
      <Navbar />
     <UserCircle2 className={styles.iconeUsuario} />
    </div>
  );
}

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.item}>Censo</div>
      <div className={styles.divisor} />
      <div className={styles.item}>Gráficos</div>
      <div className={styles.divisor} />
      <div className={styles.item}>Protetores</div>
    </nav>
  );
}

export default Header;
