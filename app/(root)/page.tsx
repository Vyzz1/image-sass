import { navLinks } from "@/constants";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Collection } from "@/components/shared/Collection";
import { getAllImages } from "@/lib/actions/image.actions";

const Home = async ({ searchParams }: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;
  const searchQuery = (searchParams?.query as string) || "";
  const images = await getAllImages({ page, searchQuery });

  return (
    <div>
      <section className="home">
        <h2 className="home-heading">
          {" "}
          Unleash Your Creative Vision With Imaginify
        </h2>
        <ul className="flex-center w-full gap-20">
          {navLinks.slice(1, 5).map((nav) => (
            <Link
              href={nav.route}
              className="flex-center flex-col gap-2"
              key={nav.label}
            >
              <li className="flex-center w-fit rounded-full bg-white p-4">
                <Image src={nav.icon} alt="image" width={24} height={24} />
              </li>
              <p className="text-center text-white p-14-medium">{nav.label} </p>
            </Link>
          ))}
        </ul>
      </section>
      <section className="sm:mt-12">
        <Collection
          images={images?.data}
          hasSearch={true}
          totalPages={images?.totalPage}
          page={page}
        />
      </section>
    </div>
  );
};

export default Home;
