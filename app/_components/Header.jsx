"use client";
import {
  UserButton,
  useUser
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

const Header = () => {
  const path = usePathname();
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    //console log path
  }, []);

  return (
    <div className="flex items-center px-10 py-6 justify-between fixed top-0 w-full shadow-sm z-50 bg-white">
      <div className="flex gap-12">
        <Link href={"/"}>
          <Image src={"/logo.png"} width={150} height={150} alt="logo" />
        </Link>
        <ul className="hidden md:flex items-center gap-10">
          <Link href={"/"}>
            <li
              className={`hover:text-primary font-medium text-sm ${
                path == "/" && "text-primary font-semibold"
              }`}
            >
              Home
            </li>
          </Link>
          <Link href={"/for-sale"}>
            <li
              className={`hover:text-primary font-medium text-sm ${
                path == "for-sale" && "text-primary font-semibold"
              }`}
            >
              For Sale
            </li>
          </Link>
          <Link href={"/for-rent"}>
            <li
              className={`hover:text-primary font-medium text-sm ${
                path == "for-rent" && "text-primary font-semibold"
              }`}
            >
              For Rent
            </li>
          </Link>
          <Link href={"/find-plot"}>
            <li
              className={`hover:text-primary font-medium text-sm ${
                path == "find-plot" && "text-primary font-bold"
              }`}
            >
              Find Plot
            </li>
          </Link>
        </ul>
      </div>
      <div className="flex gap-4 items-center">
        <Link href={"/add-listing"}>
          <Button className="flex gap-2">
            {" "}
            <Plus className="h-5 w-5" /> Post Property
          </Button>
        </Link>
        {isSignedIn ? (
          <UserButton>
            <Button variant="outline">{user.email}</Button>
          </UserButton>
        ) : (
          <Link className="border px-4 py-2 rounded-md" href="/sign-in">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
