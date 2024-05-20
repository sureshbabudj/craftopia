import { LeftPaneImage } from "../components/LeftPane";
import { RightPane } from "../login/RightPane";
import { ForgotPasswordForm } from "./ForgotPasswordForm";

export default async function ForgotPassword() {
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
        <RightPane
          title="Forgot Password?"
          subtitle="Enter your registered email to reset the password"
        >
          <br />
          <ForgotPasswordForm />
        </RightPane>
      </div>
    </>
  );
}
