export type GetProductOptions =
    | {
          Brand: string;
          ProductCode: string;
      }
    | {
          GTIN: string;
      }
    | {
          icecat_id: string | number;
      }
    | {};
