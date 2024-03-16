//Carton Erectors
//Created by: JWL
//Date: 2023/09/02 12:51:41
//Last modified: 2024/03/16 07:37:11
//Version: 1.0.0

//import new carton erector service
import newCartonErector from "./cartonErectorNew.js";
import oldCartonErector from "./cartonErectorOld.js";

//import tryCatchSimple
import * as tryCatchSimple from "./../../misc/tryCatchSimple.js";

async function getAndInsertFaultsForErectors() {
  try {
    //old carton erector
    await tryCatchSimple.Promise(
      () => oldCartonErector.getAndInsertFaultsForOldErector("10.4.2.160", "cartonErector", 1),
      "Carton Erector 1 - Fault or Count Error"
    );
    await tryCatchSimple.Promise(
      () => oldCartonErector.getAndInsertFaultsForOldErector("10.4.2.161", "cartonErector", 2),
      "Carton Erector 2 - Fault or Count Error"
    );
    await tryCatchSimple.Promise(
      () => oldCartonErector.getAndInsertFaultsForOldErector("10.4.2.162", "cartonErector", 3),
      "Carton Erector 3 - Fault or Count Error"
    );
    await tryCatchSimple.Promise(
      () => oldCartonErector.getAndInsertFaultsForOldErector("10.4.2.163", "cartonErector", 4),
      "Carton Erector 4 - Fault or Count Error"
    );

    //new carton erector
    await tryCatchSimple.Promise(
      () => newCartonErector.getAndInsertFaults("10.4.2.164", "cartonErector", 5),
      "Carton Erector 5 - Fault or Count Error"
    );
  } catch (err) {
    console.log("Error in getAndInsertFaultsForErectors");
  }
}

//export the function
export default { getAndInsertFaultsForErectors };
