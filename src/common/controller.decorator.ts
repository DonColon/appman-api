import { Param } from "@nestjs/common";
import { ParseIdPipe } from "./parse-id.pipe";
import { ParseLabelPipe } from "./parse-label.pipe";
import { ParseVersionPipe } from "./parse-version.pipe";


export const ID = Param("id", ParseIdPipe);
export const Label = Param("label", ParseLabelPipe);
export const Version = Param("version", ParseVersionPipe);