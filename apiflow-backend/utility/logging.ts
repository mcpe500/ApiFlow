import pc from "picocolors";
import { Formatter } from "picocolors/types";

const sendMessage = (
  type: string,
  message: string,
  prefix: string,
  prefixFormatter: Formatter,
  messageFormatter: Formatter,
) => {
  console.log(
    pc.bold(
      `${prefixFormatter(`${`[${(prefix.length > 0 ? prefix + " " : "").toUpperCase()}${type.toUpperCase()}]`}`)} ${messageFormatter(message)}`,
    ),
  );
};

export const log = (message: string, prefix: string = "") => {
  sendMessage("log", message, prefix, pc.bgBlue, pc.green);
};

export const error = (message: string | Error | unknown, prefix: string = "") => {
  //@ts-ignore
  sendMessage("error", message.toString(), prefix, pc.bgRed, pc.red);
};

export const info = (message: string, prefix: string = "") => {
  sendMessage("info", message, prefix, pc.bgGreen, pc.blue);
};

export const warn = (message: string, prefix: string = "") => {
  sendMessage("warn", message, prefix, pc.bgYellow, pc.bgYellow);
};

export const debug = (message: string, prefix: string = "") => {
  sendMessage("debug", message, prefix, pc.bgWhite, pc.bgWhite);
};
