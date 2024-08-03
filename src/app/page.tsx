"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import "./mainpage.css";

export default function Mainpage() {
  const Router = useRouter();
  useEffect(() => {
    Router.push("/homepage");
  });
  return (
    <div className="screendetails">
      <div className="headerrow">&nbsp;</div>
      <div className="loaderdetails">
        <div className="dotdetails"></div>
        <div className="dotdetails"></div>
        <div className="dotdetails"></div>
      </div>
    </div>
  );
}
