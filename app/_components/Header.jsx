"use client";
import { SignOutButton, UserButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { ChevronDown, Menu, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
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

console.log(path)

  return (
    <div className="flex items-center px-12 py-2 justify-between fixed top-0 w-full shadow-sm z-50 bg-white">
      <div className="flex gap-14">
        <Link href={"/"}>
          <Image
            src={"/logo.png"}
            width={140}
            height={140}
            alt="logo"
            className="w-auto h-auto"
          />
        </Link>
        <ul className="hidden md:hidden lg:flex items-center gap-10 ml-12">
          <Link href={"/"}>
            <li
              className={`hover:text-primary font-medium text-base ${
                path == "/" && "text-primary font-extrabold"
              }`}
            >
              Home
            </li>
          </Link>
          <Link href={"/listings"}>
            <li
              className={`hover:text-primary font-medium text-base ${
                path == "/listings" && "text-primary font-extrabold"
              }`}
            >
              Listings
            </li>
          </Link>

          <Link href={"/for-rent"}>
            <li
              className={`hover:text-primary font-medium text-base ${
                path == "for-rent" && "text-primary font-extrabold"
              }`}
            >
              For Rent
            </li>
          </Link>

          <li>
            <DropdownMenu>
              <DropdownMenuTrigger
                className={`flex border-0 items-center hover:text-primary font-medium text-base`}
              >
                Our Sites <ChevronDown className="h-5 w-5" />{" "}
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link
                    href={"/nthc"}
                    className={`hover:text-primary font-medium text-base ${
                      path == "nthc" && "text-primary font-extrabold"
                    }`}
                  >
                    Kwadaso Site (NTHC)
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    href={"/dar-es-salaam"}
                    className={`hover:text-primary font-medium text-base ${
                      path == "dar-es-salaam" && "text-primary font-extrabold"
                    }`}
                  >
                    Dar Es Salaam (Ejisu)
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <Link
                    href={"/trabuom"}
                    className={`hover:text-primary font-medium text-base ${
                      path == "trabuom" && "text-primary font-extrabold"
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
        <div>
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button className="flex gap-2">
                  {" "}
                  <Plus className="h-5 w-5" /> Post Property
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="p-3">
                <DropdownMenuItem>
                  <Link
                    href={"/add-house"}
                    className={`hover:text-primary font-medium text-base ${
                      path == "add-house" && "text-primary font-extrabold"
                    }`}
                  >
                    Add House Listing
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    href={"/add-land"}
                    className={`hover:text-primary font-medium text-base ${
                      path == "/add-land" && "text-primary font-extrabold"
                    }`}
                  >
                    Add Land Listing
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {isSignedIn ? (
          // <UserButton />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Image
                src={user?.imageUrl}
                width={35}
                height={35}
                alt="user profile"
                className="rounded-full"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link
                  href={"/profile"}
                  className={`hover:text-primary font-medium text-base ${
                    path == "/profile" && "text-primary font-extrabold"
                  }`}
                >
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href={"/profile#/my-listing"}
                  className={`hover:text-primary font-medium text-base ${
                    path == "/listings" && "text-primary font-extrabold"
                  }`}
                >
                  My Listings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>Manage Account</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-700 text-base font-extrabold">
                <SignOutButton>Logout</SignOutButton>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link className={`border px-8 py-2 rounded-md bg-primary text-white`} href="/sign-in">
            Login
          </Link>
        )}
      </div>

      {/* On Mobile Menu */}
      <div className="block lg:hidden xl:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Menu />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 pl-4 py-4 mr-3">
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link
                  href={"/"}
                  className={`hover:text-primary font-medium text-base ${
                    path == "/" && "text-primary font-bold"
                  }`}
                >
                  Home
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href={"/listings"}
                  className={`hover:text-primary font-medium text-base ${
                    path == "listings" && "text-primary font-bold"
                  }`}
                >
                  Listings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href={"/for-rent"}
                  className={`hover:text-primary font-medium text-base ${
                    path == "for-rent" && "text-primary font-bold"
                  }`}
                >
                  For Rent
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Our Sites</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>
                      <Link
                        href={"/nthc"}
                        className={`hover:text-primary font-medium text-base ${
                          path == "nthc" && "text-primary font-extrabold"
                        }`}
                      >
                        Kwadaso(NTHC)
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link
                        href={"/dar-es-salaam"}
                        className={`hover:text-primary font-medium text-base ${
                          path == "dar-es-salaam" &&
                          "text-primary font-extrabold"
                        }`}
                      >
                        Dar Es Salaam (Ejisu)
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link
                        href={"/trabuom"}
                        className={`hover:text-primary font-medium text-base ${
                          path == "trabuom" && "text-primary font-extrabold"
                        }`}
                      >
                        Trabuom Site
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            {/* <DropdownMenuItem className="flex justify-between items-center">
              <UserButton />
            </DropdownMenuItem>
            <DropdownMenuSeparator /> */}
            <DropdownMenuItem className="font-extrabold text-red-600">
              Login
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Header;
