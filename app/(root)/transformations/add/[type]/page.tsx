import Header from "@/components/shared/Header";
import TransformationForm from "@/components/shared/TransformationForm";
import { transformationTypes } from "@/constants";
import React from "react";
import { auth } from "@clerk/nextjs/server";
import { getUserById } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
const AddTransformationTypePage = async ({
  params: { type },
}: SearchParamProps) => {
  const { title, subTitle, type: transType } = transformationTypes[type];
  const { userId: clerkID } = auth();
  if (!clerkID) redirect("/sign-in");
  const { _id, creditBalance } = await getUserById(clerkID);

  return (
    <>
      <Header title={title} subtitle={subTitle} />
      {/* {userId} */}

      <section className="mt-10">
        <TransformationForm
          creditBalance={creditBalance}
          action="Add"
          userId={_id}
          type={transType as TransformationTypeKey}
        />
      </section>
    </>
  );
};

export default AddTransformationTypePage;
