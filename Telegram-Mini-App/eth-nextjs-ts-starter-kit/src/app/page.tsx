"use client";

import {
  useUtils,
  usePopup,
  useMainButton,
  useViewport,
} from "@telegram-apps/sdk-react";
import Link from "next/link";
import Arrow from "@/assets/Arrow";
import { Button } from "@/components/ui/button";

export default function Home() {
  const utils = useUtils();
  const popUp = usePopup();
  const mainBtn = useMainButton();
  const viewport = useViewport();

  const handlePopUp = async () => {
    const response = await popUp.open({
      title: " Rabble",
      message: "Link will lead to website",
      buttons: [
        { id: "link", type: "default", text: "Open rabble.pro" },
        { type: "cancel" },
      ],
    });
    if (response === "link") {
      utils.openLink("https://rabble.pro");
    }
  };

  const handleShare = async () => {
    utils.shareURL(
      "https://t.me/+rFqLyk4_W-diZDZl",
      "Join! Mini Apps Hackathon group!"
    );
  };
  const handleMainBtn = async () => {
    mainBtn.enable();
    mainBtn.setText("New Text");
    mainBtn.setBgColor("#08F7AF");
    if (mainBtn.isVisible) {
      mainBtn.hide();
    } else {
      mainBtn.show();
    }
  };

  mainBtn.on("click", () => {
    mainBtn.showLoader();
    mainBtn.setText("Action Performing");
    setTimeout(() => {
      console.log("Main Button Clicked");
      mainBtn.hideLoader();
      mainBtn.setText("New Text");
      mainBtn.hide();
    }, 2000);
  });

  const handleViewport = async () => {
    if (!viewport?.isExpanded) {
      viewport?.expand();
    }
  };
  return (
    <main className="">
      <h1 className="text-left text-2xl font-bold  font-sans mb-4 ">
        Telegram Miniapp Boilerplate
      </h1>
      <div className="grid xl:grid-cols-4 grid-cols-1 lg:grid-cols-2  gap-4 ">
        <div className="p-4 hover:bg-gray-200 w-full bg-gray-100 rounded-lg">
          <Link href="https://docs.telegram-mini-apps.com/" target="_blank">
            <div className="flex justify-between">
              <h1 className="text-xl font-bold">Docs</h1>
              <Arrow color="black" />
            </div>
            <p className="text-sm text-gray-700">
              Find in-depth information on making telegram miniapps for Rabble.
            </p>
          </Link>
        </div>
        <div className="p-4  w-full bg-gray-100 rounded-lg">
          <h2 className="text-lg font-bold">Test Modals</h2>
          <p className="text-sm">Click to see how modals work</p>
          <div className="flex gap-2 mt-2">
            <Button variant={"rabble"} size={"half"} onClick={handlePopUp}>
              Launch Popup
            </Button>
            <Button variant={"tertiary"} size={"half"} onClick={handleShare}>
              Share URL
            </Button>
          </div>
        </div>
        <div className="p-4  w-full bg-gray-100 rounded-lg">
          <h2 className="text-lg font-bold">Test Buttons</h2>
          <p className="text-sm">Click to see how buttons work</p>
          <div className="flex gap-2 mt-2">
            <Button variant={"rabble"} size={"half"} onClick={handleMainBtn}>
              Toggle Main Button
            </Button>
            <Button variant={"tertiary"} size={"half"} onClick={handleViewport}>
              Expand Webview
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
