//Carton Erectors
//Created by: JWL
//Date: 2023/09/02 12:51:41
//Last modified: 2023/12/09 17:06:32
//Version: 1.0.0

//import new carton erector service
import newCartonErector from "./cartonErectorNew.js";
import oldCartonErector from "./cartonErectorOld.js";

//import tryCatchSimple
import * as tryCatchSimple from "./../../misc/tryCatchSimple.js";

async function getAndInsertFaultsForErectors() {
  try {
    //old carton erector
    await tryCatchSimple.Promise(() => oldCartonErector.getAndInsertFaultsForOldErector("10.4.2.160", "cartonErector", 1));
    await tryCatchSimple.Promise(() => oldCartonErector.getAndInsertFaultsForOldErector("10.4.2.161", "cartonErector", 2));
    await tryCatchSimple.Promise(() => oldCartonErector.getAndInsertFaultsForOldErector("10.4.2.162", "cartonErector", 3));
    await tryCatchSimple.Promise(() => oldCartonErector.getAndInsertFaultsForOldErector("10.4.2.163", "cartonErector", 4));

    //new carton erector
    await tryCatchSimple.Promise(() => newCartonErector.getAndInsertFaults("10.4.2.164", "cartonErector", 5));
  } catch (err) {
    console.log("Error in getAndInsertFaultsForErectors");
  }
}

//export the function
export default { getAndInsertFaultsForErectors };
