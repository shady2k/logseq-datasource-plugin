import "@logseq/libs";
import { io } from "socket.io-client";

let isDebug = false;

function log(message: any) {
  if (isDebug) console.log(message);
}

interface Response {
  isError: boolean;
  result: {}
}

/**
 * main entry
 */
async function main() {
  if (logseq.settings?.isDebug === true) {
    isDebug = true;
  }

  if (
    !logseq.settings?.hasOwnProperty("serverName") ||
    logseq.settings?.serverName === null ||
    logseq.settings?.serverName === undefined ||
    logseq.settings?.serverName === ""
  ) {
    logseq.App.showMsg(
      "[Socket] No server found, you must specify it to conitune"
    );
  }

  const socket = io(logseq.settings?.serverName);

  socket.on("connect", () => {
    log(`Connection estabilished with ${socket.id}`);
    socket.on("query", (payload, callback) => {
      log(payload);

      queryLogseq(payload.query)
        .then(response => {
          callback(response);
        })
        .catch(err => {
          callback(err);
        })
    });
  });
}

async function queryLogseq(query: string) {
  let ret;
  try {
    ret = await logseq.DB.datascriptQuery(query);
    return {
      isError: false,
      result: (ret || []).flat()
    }
  } catch (err) {
    return {
      isError: true,
      result: err
    }
  }
}

// bootstrap
logseq.ready(main).catch(console.error);
