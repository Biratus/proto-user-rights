import { AxiosResponse } from "axios";

export function isOk(res: AxiosResponse<any, any>) {
  return res.status === 200;
}
