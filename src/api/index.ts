import {create} from 'apisauce';

import { REACT_APP_PROD_EU_MODE, REACT_APP_PROD_US_MODE, REACT_APP_STAGE_MODE } from "@env"

export const api = create({
  baseURL: REACT_APP_STAGE_MODE,
});
