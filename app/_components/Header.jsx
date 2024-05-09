"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { ChevronDown, Menu, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
        <ul className="hidden md:hidden lg:flex items-center gap-10">
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
              For Sale
            </li>
          </Link>

          <li>
            <DropdownMenu>
              <DropdownMenuTrigger className={`flex border-0`}>
                Our Sites <ChevronDown />{" "}
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link
                    href={"/nthc"}
                    className={`hover:text-primary font-medium text-sm ${
                      path == "nthc" && "text-primary font-semibold"
                    }`}
                  >
                    Kwadaso Site (NTHC)
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    href={"/dar-es-salaam"}
                    className={`hover:text-primary font-medium text-sm ${
                      path == "dar-es-salaam" && "text-primary font-semibold"
                    }`}
                  >
                    Dar Es Salaam
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <Link
                    href={"/trabuom"}
                    className={`hover:text-primary font-medium text-sm ${
                      path == "trabuom" && "text-primary font-semibold"
                    }`}
                  >
                    Trabuom Site
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
        </ul>
      </div>

      <div className="lg:flex gap-4 items-center hidden">
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

      {/* On Mobile Menu */}
      <div className="block lg:hidden xl:hidden ">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
          <Menu />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                Profile
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Billing
                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Settings
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Keyboard shortcuts
                <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>Email</DropdownMenuItem>
                    <DropdownMenuItem>Message</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>More...</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuItem>
                New Team
                <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>GitHub</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuItem disabled>API</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              Log out
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Header;
