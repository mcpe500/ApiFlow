import { useEffect, useState } from "react";
import { HTTP_STATUS, HTTP_STATUS_MESSAGES } from "../../config/httpStatus";

export default function Error({ errorType }) {
  const [code, setCode] = useState(HTTP_STATUS.NOT_FOUND);
  const [message, setMessage] = useState("");

  useEffect(() => {
    switch (errorType) {
      case HTTP_STATUS.NOT_FOUND:
        setCode(HTTP_STATUS.NOT_FOUND);
        setMessage(HTTP_STATUS_MESSAGES[HTTP_STATUS.NOT_FOUND]);
        break;
      case HTTP_STATUS.INTERNAL_SERVER_ERROR:
        setCode(HTTP_STATUS.INTERNAL_SERVER_ERROR);
        setMessage(HTTP_STATUS_MESSAGES[HTTP_STATUS.INTERNAL_SERVER_ERROR]);
        break;
      default:
        setCode(HTTP_STATUS.NOT_FOUND);
        setMessage(HTTP_STATUS_MESSAGES[HTTP_STATUS.NOT_FOUND]);
        break;
    }
  }, [errorType]);
  return (
    <div className="bg-white rounded-lg py-5">
      <div className="container flex flex-col mx-auto bg-white rounded-lg pt-6 my-5">
        <div className="flex justify-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5 draggable">
          <div className="flex items-center justify-center w-full lg:p-4">
            <div className="flex items-center xl:p-3">
              <h1 className="text-slate-500" style={{ fontSize: "64px" }}>
                {code}
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap">
        <div className="w-full max-w-full sm:w-3/4 mx-auto text-center">
          <p
            className="text-sm text-slate-500 py-1"
            style={{ fontSize: "32px" }}
          >
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}
