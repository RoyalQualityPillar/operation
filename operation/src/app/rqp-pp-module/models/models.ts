export interface PaymentTermsCodeList {
  uc0001: string;
  ff0001: string;
  ff0002: string;
  ff0003: string;
  ff0004: string;
  ff0005: string;
  createdby: string;
  status: string;
  comments: string;
}

export interface DataModel {
  buCode: string;
  data: PaymentTermsCodeList[];
  errorInfo: string;
  sessionLogoutTime: number;
  status: string;
}
