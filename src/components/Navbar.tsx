import Link from "next/link";
import React from "react";
import Image from "next/image";
import Logo from "@/../public/logo.png";

function Navbar() {
  return (
    <div>
      <nav>
        <Image
          src={Logo}
          alt="Logo"
          width={70}
          quality={100}
          placeholder="blur"
        />
        <h1>PersonalPage</h1>
        <Link href="/">Dashboard</Link>
        <Link href="/messages">Messages</Link>
        <Link href="/about">About</Link>
      </nav>
    </div>
  );
}

export default Navbar;
