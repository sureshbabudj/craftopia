import React from "react";
import { LeftPaneImage } from "../components/LeftPane";
import { RightPane } from "./RightPane";

export default async function Login() {
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
        <RightPane />
      </div>
    </>
  );
}
