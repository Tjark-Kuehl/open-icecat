export interface IIcecatProduct {
    GeneralInfo?: {
        IcecatId: number;
        ReleaseDate: string;
        EndOfLifeDate: string;
        Title: string;
        Brand: string;
        BrandLogo: string;
        BrandInfo: {
            BrandName: string;
            BrandLocalName: string;
            BrandLogo: string;
        };
        ProductName: string;
        BrandPartCode: string;
        GTIN: [string];
        Category: { CategoryID: number; Name: { Value: string; Language: string } };
        ProductFamily: { ProductFamilyID: number; Value: string; Language: string };
        ProductSeries: { SeriesID: number; Value: string; Language: string };
        Description: {
            ID: number;
            LongDesc: string;
            LongProductName: string;
            MiddleDesc: string;
            Disclaimer: string;
            ManualPDFURL: string;
            ManualPDFSize: number;
            LeafletPDFURL: string;
            PDFSize: number;
            URL: string;
            WarrantyInfo: string;
            Updated: string;
        };
        SummaryDescription: {
            ShortSummaryDescription: string;
            LongSummaryDescription: string;
        };
        BulletPoints: [];
    };
    Image?: {
        HighPic: string;
        HighPicSize: number;
        HighPicHeight: number;
        HighPicWidth: number;
        LowPic: string;
        LowPicSize: number;
        LowPicHeight: number;
        LowPicWidth: number;
        Pic500x500: string;
        Pic500x500Size: number;
        Pic500x500Height: number;
        Pic500x500Width: number;
        ThumbPic: string;
        ThumbPicSize: number;
    };
    Multimedia?: [
        {
            ID: string;
            URL: string;
            Type: string;
            ContentType: string;
            KeepAsUrl: number;
            Description: string;
            Size: number;
            IsPrivate: number;
            Updated: string;
            Language: string;
            IsVideo: number;
        }
    ];
    Gallery?: [
        {
            ID: number;
            LowPic: string;
            LowSize: number;
            LowHeight: number;
            LowWidth: number;
            ThumbPic: string;
            ThumbPicSize: number;
            Pic: string;
            Size: number;
            PicHeight: number;
            PicWidth: number;
            Pic500x500: string;
            Pic500x500Size: number;
            Pic500x500Height: number;
            Pic500x500Width: number;
            No: number;
            IsMain: string;
            Updated: string;
            IsPrivate: number;
            Type: string;
            Attributes: { OriginalFileName: string };
        }
    ];
    FeatureLogos?: [
        {
            LogoPic: string;
            Width: number;
            Height: number;
            Size: number;
            ThumbPic: string;
            FeatureID: number;
            Value: string;
            Description: {
                Value: string;
                Language: string;
            };
            KeyLogo: number;
        }
    ];
    FeaturesGroups?: [
        {
            ID: number;
            SortNo: string;
            FeatureGroup: { ID: string; Name: { Value: string; Language: string } };
            Features: [
                {
                    Localized: number;
                    ID: number;
                    Type: string;
                    Value: string;
                    CategoryFeatureId: string;
                    CategoryFeatureGroupID: string;
                    SortNo: string;
                    PresentationValue: string;
                    RawValue: string;
                    LocalValue: [];
                    Description: string;
                    Mandatory: string;
                    Searchable: string;
                    Feature: {
                        ID: string;
                        Sign: string;
                        Measure: {
                            ID: string;
                            Sign: string;
                            Signs: {
                                ID: string;
                                _: string;
                                Language: string;
                            };
                        };
                        Name: { Value: string; Language: string };
                    };
                }
            ];
        }
    ];
}
