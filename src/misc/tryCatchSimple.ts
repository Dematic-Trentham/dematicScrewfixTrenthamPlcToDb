//@ts-ignore
import dematic from "dematic-master-lib";

//try catch function to catch any errors and log them to the console
function Void(fn: () => void, name?: string) {
  try {
    fn();
  } catch (err) {
    if (name != undefined) {
      dematic.log("Error in " + name);
    }
    dematic.log(err);
  }
}
//try catch function to catch any errors and log them to the console
async function Promise(fn: () => Promise<void>, name?: string) {
  try {
    await fn();
  } catch (err) {
    if (name != undefined) {
      dematic.log("Error in " + name);
    }
    dematic.log(err);
  }
}
//try catch function to catch any errors and log them to the console
function WithParam(fn: (param: any) => void, param: any, name?: string) {
  try {
    fn(param);
  } catch (err) {
    if (name != undefined) {
      dematic.log("Error in " + name);
    }
    dematic.log(err);
  }
}
//try catch function to catch any errors and log them to the console

async function PromiseWithParam(fn: (param: any) => Promise<any>, param: any, name?: string) {
  try {
    await fn(param);
  } catch (err) {
    if (name != undefined) {
      dematic.log("Error in " + name);
    }

    dematic.log(err);
  }
}

export { Void, WithParam, Promise, PromiseWithParam };
