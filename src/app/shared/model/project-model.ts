import { isNullOrUndefined } from "@abp/ng.core";
import _ from "lodash";
import { Common } from "../common/common";
import { Utils } from "../utils";

export class IdToken {
  sub: string;
  role: string[];
  phone_number_verified: string;
  email: string;
  email_verified: string;
  preferred_username: string;
  name: string;
  given_name: string;
}
export class OfficeUser {
  id: number;
  officeCode?: string;
  userId?: string;
  userName?: string;
  email?: string;
  postingId: number;
  employeeId: number;
  order: number=0;
  name?: string;
  designation?: string;
  isActive: boolean;
}
