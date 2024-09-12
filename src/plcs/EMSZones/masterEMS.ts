import PLC1 from "./PLC1.js";
import PLC2 from "./PLC2.js";

import PLC11 from "./PLC11.js";
import PLC12 from "./PLC12.js";
import PLC13 from "./PLC13.js";

import PLC21 from "./PLC21.js";
import PLC22 from "./PLC22.js";
import PLC23 from "./PLC23.js";
import PLC24 from "./PLC24.js";

import PLC31 from "./PLC31.js";
import PLC32 from "./PLC32.js";
import PLC33 from "./PLC33.js";

import PLC34 from "./PLC34.js";
import PLC35 from "./PLC35.js";
import { timeAFunction } from "../../misc/timeAFunction.js";

async function checkAllEMS() {
  timeAFunction("checkAllEMS", async () => {
    await checkAllEMS2();
  });

  //console.log("checking EMS zones");

  //await PLC35.read35EMSToDB();

  // console.log("checked EMS zones");
}

export default { checkAllEMS };

async function checkAllEMS2() {
  await PLC1.read1EMSToDB();
  await PLC2.read2EMSToDB();

  await PLC11.read11EMSToDB();
  await PLC12.read12EMSToDB();
  await PLC13.read13EMSToDB();

  await PLC21.read21EMSToDB();
  await PLC22.read22EMSToDB();
  await PLC23.read23EMSToDB();
  await PLC24.read24EMSToDB();

  await PLC31.read31EMSToDB();
  await PLC32.read32EMSToDB();
  await PLC33.read33EMSToDB();

  await PLC34.read34EMSToDB();
}
