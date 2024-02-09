//Service for Dematic Dashboard Screwfix Carton Closing to DB = iPack faults
//Created by: JWL
//Date: 2023/07/02
//Last modified: 2023/12/28 08:44:00

const iPackFaults: any[] = [];

iPackFaults[0] = `DayNumber`;
iPackFaults[2] = `DateDay`;
iPackFaults[4] = `DateMonth`;
iPackFaults[6] = `DateYear`;
iPackFaults[8] = `TimeHr`;
iPackFaults[10] = `TimeMin`;
iPackFaults[12] = `TimeSec`;
iPackFaults[14] = `TimeMsecs`;
iPackFaults[16] = `D1EmergencyStop`;
iPackFaults[18] = `D2CircuitBreaker`;
iPackFaults[20] = `D3OpenedDoor`;
iPackFaults[22] = `D4GlueTankDefect`;
iPackFaults[24] = `D5GlueStockLowLevelDefect`;
iPackFaults[26] = `D6GlueTankNotReady`;
iPackFaults[28] = `D7GeneralAirPressureDefect`;
iPackFaults[30] = `D8WrongLidGripDefect`;
iPackFaults[32] = `D9LidUnderCavityDefect`;
iPackFaults[34] = `D10EmptyMagazineDefect`;
iPackFaults[36] = `D11IntroductionBoxDefect`;
iPackFaults[38] = `D12DefectSensorLowSpeedActiveLidLift`;
iPackFaults[40] = `D13LidLiftUpwardMotionDefect`;
iPackFaults[42] = `D14LidLiftDownwardMotionDefect`;
iPackFaults[44] = `D15StepByStepConveyorForwardMotionDefect`;
iPackFaults[46] = `D16(LongSideIfOyster)PressingCylinderForwardMotionDefect`;
iPackFaults[48] = `D17(LongSideIfOyster)PressingCylinderBackwardMotionDefect`;
iPackFaults[50] = `D18FillingSensorForStopOrLspOfMarkingLiftDefect`;
iPackFaults[52] = `D19WronglyGluedLid`;
iPackFaults[54] = `D20LidCenteringCylinderForwarddMotionDefect`;
iPackFaults[56] = `D21LidCenteringCylinderBackwarddMotionDefect`;
iPackFaults[58] = `D22ExitBoxAcknoledgeMissing`;
iPackFaults[60] = `D23BoxPositionAtLidStationDefect`;
iPackFaults[62] = `D24ChosenInhibitedMagazineXlDefect`;
iPackFaults[64] = `D25MarkingLiftUpwardMotionDefect`;
iPackFaults[66] = `D26MarkingLiftDownwardMotionDefect`;
iPackFaults[68] = `D27HorizontalMarkingCylinderForwardMotionDefect`;
iPackFaults[70] = `D28HorizontalMarkingCylinderBackwardMotionDefect`;
iPackFaults[72] = `D29ObliqueMarkingCylinderForwardMotionDefect`;
iPackFaults[74] = `D30ObliqueMarkingCylinderBackwardMotionDefect`;
iPackFaults[76] = `D31BoxMissingAtMarkingStation`;
iPackFaults[78] = `D32SecurityForMovementStepByStepConveyorMissing`;
iPackFaults[80] = `D33SecurityForMovementMarkingLiftMissing`;
iPackFaults[82] = `D34SecurityForMovementLidLiftMissing`;
iPackFaults[84] = `D35WronglyGluedFlap`;
iPackFaults[86] = `D36StepByStepConveyorInverterDefect`;
iPackFaults[88] = `D37FoldingCylinderForwardMotionDefect`;
iPackFaults[90] = `D38FoldingCylinderBackwardMotionDefect`;
iPackFaults[92] = `D39BoxMissingAtFoldingStation`;
iPackFaults[94] = `D40IntroductionConveyorNotReady`;
iPackFaults[96] = `D41BarCodeScannerDefect`;
iPackFaults[98] = `D42NoReadBarcode`;
iPackFaults[100] = `D43CounterplateInUpperPosition`;
iPackFaults[102] = `D44BoxPositionAtMarkingStationDefect`;
iPackFaults[104] = `D45BlockedInitialization`;
iPackFaults[106] = `D46BoxPositionAtFoldingStationDefect`;
iPackFaults[108] = `D47BoxMissingAtLidStation`;
iPackFaults[110] = `D48LidMissingUnderCavity`;
iPackFaults[112] = `D49MarkingCenteringCylinderForwardMotionDefect`;
iPackFaults[114] = `D50MarkingCenteringCylinderBackwardMotionDefect`;
iPackFaults[116] = `D51DetectionUnderCavityAtMarkingStation`;
iPackFaults[118] = `D52MarkingLiftInverterDefect`;
iPackFaults[120] = `D53LidLiftInverterDefect`;
iPackFaults[122] = `D54BoxTooFilled`;
iPackFaults[124] = `D55MarkingLiftUpwMotionLowSpeedDef`;
iPackFaults[126] = `D56`;
iPackFaults[128] = `D57LidTransferInPositionMissing`;
iPackFaults[130] = `D58CavitySuctionCupsCylinderForwarddMotionDefect`;
iPackFaults[132] = `D59CavitySuctionCupsCylinderBackwarddMotionDefect`;
iPackFaults[134] = `D60FoldingCenteringCylinderForwarddMotionDefect`;
iPackFaults[136] = `D61FoldingCenteringCylinderBackwarddMotionDefect`;
iPackFaults[138] = `D62LidLiftLowPositionMissing`;
iPackFaults[140] = `D63MarkingLiftLowPositionMissing`;
iPackFaults[142] = `D64StepByStepConveyorInPositionMissing`;
iPackFaults[144] = `D65DialogueWithSupervisionDefect`;
iPackFaults[146] = `D66SystemImageTakenNotReady`;
iPackFaults[148] = `D67DialogueWithSystemImageTakenDefect`;
iPackFaults[150] = `D68PressingCylinderForwardMotionDefectShortSide`;
iPackFaults[152] = `D69PressingCylinderBackwardMotionDefectShortSide`;
iPackFaults[154] = `D97MotionLidOnXlMagazineConveyorDefect`;
iPackFaults[156] = `D98MxlArmUnstackerUpwardMotionDefect`;
iPackFaults[158] = `D99MxlArmUnstackerDownwardMotionDefect`;
iPackFaults[160] = `D100MxlUnstackerDockingCylinderForwardMotionDef.`;
iPackFaults[162] = `D101MxlUnstackerDockingCylinderBackwardMotionDef.`;
iPackFaults[164] = `D102MxlTransferMotionToIpackDefect`;
iPackFaults[166] = `D103MxlTransferMotionToUnstackerDefect`;
iPackFaults[168] = `D104MxlTransferOriginCatchDefect`;
iPackFaults[170] = `D105AxisZTransferCylinderForwardMotionDefect`;
iPackFaults[172] = `D106AxisZTransferCylinderBackwardMotionDefect`;
iPackFaults[174] = `D107LidMissingAtUnstackerToMxlTransferPosition`;
iPackFaults[176] = `D108BadMxlTransferPosition`;
iPackFaults[178] = `D109MxlArmUnstackerMotion`;
iPackFaults[180] = `D110AxisZMxlTransferCylinderForwardMotion`;
iPackFaults[182] = `D111IpackTransferMotionNotAllowed`;
iPackFaults[184] = `D112MxlTransferMotionNotAllowed`;
iPackFaults[186] = `D113LidMissingAtIpackTransfer`;
iPackFaults[188] = `D114OneDownPositionArmUnstackerMxl1Or2Missing`;
iPackFaults[190] = `D115MotionLidOnXl2MagazineConveyorDefect`;
iPackFaults[192] = `D116Mxl2ArmUnstackerUpwardMotionDefect`;
iPackFaults[194] = `D117Mxl2ArmUnstackerDownwardMotionDefect`;
iPackFaults[196] = `D118Mxl2UnstackerDockingCylinderForwardMotionDef.`;
iPackFaults[198] = `D119Mxl2UnstackerDockingCylinderBackwardMotionDef.`;
iPackFaults[200] = `D120Mxl2ArmUnstackerMotion`;
iPackFaults[202] = `D121TakeOffTheLidReadyForTransfer`;
iPackFaults[204] = `D122EmptyXl2MagazineDefect`;
iPackFaults[206] = `D123MotionLidOnXl3MagazineConveyorDefect`;
iPackFaults[208] = `D124Mxl3ArmUnstackerUpwardMotionDefect`;
iPackFaults[210] = `D125Mxl3ArmUnstackerDownwardMotionDefect`;
iPackFaults[212] = `D126Mxl3UnstackerDockingCylinderForwardMotionDef.`;
iPackFaults[214] = `D127Mxl3UnstackerDockingCylinderBackwardMotionDef.`;
iPackFaults[216] = `D128Mxl3ArmUnstackerMotion`;
iPackFaults[218] = `D129EmptyXl3MagazineDefect`;
iPackFaults[220] = `D130MotionLidOnXl4MagazineConveyorDefect`;
iPackFaults[222] = `D131Mxl4ArmUnstackerUpwardMotionDefect`;
iPackFaults[224] = `D132Mxl4ArmUnstackerDownwardMotionDefect`;
iPackFaults[226] = `D133Mxl4UnstackerDockingCylinderForwardMotionDef.`;
iPackFaults[228] = `D134Mxl4UnstackerDockingCylinderBackwardMotionDef.`;
iPackFaults[230] = `D135Mxl4ArmUnstackerMotion`;
iPackFaults[232] = `D136EmptyXl4MagazineDefect`;
iPackFaults[234] = `D137OneDownPositionArmUnstackerMxl3Or4Missing`;
iPackFaults[236] = `D138EmptyXl1MagazineDefect`;
iPackFaults[238] = `D139XlMagazineTransferInverterDefect`;
iPackFaults[240] = `EmptyCartonsCounter`;
iPackFaults[242] = `EmptyCartonsHelpMark`;
iPackFaults[244] = `Spare3`;
iPackFaults[246] = `Spare4`;
iPackFaults[248] = `Spare5`;
iPackFaults[250] = `Spare6`; //box
iPackFaults[252] = `Spare7`;
iPackFaults[254] = `Spare8`;
iPackFaults[256] = `Spare9`;

//export the array
export { iPackFaults };
