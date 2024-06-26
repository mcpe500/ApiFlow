import { Component } from "react";
import Navbar from "../../components/Navbar";

export default function Auth({ component: Component }) {
  return (
    <div className="bg-white rounded-lg py-5">
      <Navbar/>
      <div className="container flex flex-col mx-auto bg-white rounded-lg pt-6 my-5">
        <div className="flex justify-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5 draggable">
          <div className="flex items-center justify-center w-full lg:p-4">
            <div className="flex items-center xl:p-3">
              <Component />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap">
        <div className="w-full max-w-full sm:w-3/4 mx-auto text-center">
          <p className="text-sm text-slate-500 py-1">
            Tailwind CSS Component from{" "}
            <a
              href="https://www.loopple.com/theme/motion-landing-library?ref=tailwindcomponents"
              className="text-slate-700 hover:text-slate-900"
              target="_blank"
            >
              Motion Landing Library
            </a>{" "}
            by{" "}
            <a
              href="https://www.loopple.com"
              className="text-slate-700 hover:text-slate-900"
              target="_blank"
            >
              Loopple Builder
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
