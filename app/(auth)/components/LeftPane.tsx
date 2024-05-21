import { LeftPaneImage } from "./LeftPaneImage";

export function LeftPane() {
  return (
    <div className="hidden lg:flex items-center justify-center flex-1 bg-white text-black">
      <div className="max-w-md text-center">
        <LeftPaneImage />
      </div>
    </div>
  );
}
