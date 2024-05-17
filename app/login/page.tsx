import React from "react";
import { LeftPaneImage } from "./LeftPane";
import { RightPane } from "./RightPane";

export default async function Login({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <>
      {/* component */}
      <div className="flex h-screen">
        {/* Left Pane */}
        <div className="hidden lg:flex items-center justify-center flex-1 bg-white text-black">
          <div className="max-w-md text-center">
            <LeftPaneImage />
          </div>
        </div>
        {/* Right Pane */}
        <RightPane />
      </div>
    </>
  );
}
