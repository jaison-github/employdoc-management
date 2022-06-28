export enum MasterDataLookUpTypes {
  nationmaster = '1',
  doctypes = '3',
  departmentmaster = '4',
  professionmaster = '5',
  gendermaster = '6',
  vpmaster = '10',
  cmpmaster = '11',
  browsedata = '12',
  empdropdownlist = '13',
  doclocationlist = '17',
  docexpirylist = '18'
}



export class Pagination {
  PageSize?: number;
  PageIndex?: number;
}

export class Order {
  OrderBy?: string;
  OrderType?: string;
}

export class FilterOperator {
  Operator?: string = 'and';
  Filters?: any[];
}

export class Filter {
  FilterBy: string;
  FilterType: string;
  Value: string;
}

export class FilterRangeType {
  FilterBy: string;
  FilterType: string;
  Value: DateRangeType;
}

export class DateRangeType {
  From: string;
  To: string;
}
