export type GetProductOptions =
    | {
          Brand: string;
          ProductCode: string;
      }
    | {
          GTIN: string;
      }
    | {
          UPC: string;
      }
    | {
          JAN: string;
      }
    | {
          icecat_id: string | number;
      }
    | {};
