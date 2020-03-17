export interface IIcecatProductReviews {
    ReasonsToBuy?: [
        {
            ReasonToBuyID: number;
            Value: string;
            HighPic: string;
            HighPicSize: number;
            No: number;
            Title: string;
            Language: string;
            Updated: string;
            Origin: string;
            IsPrivate: number;
        }
    ];
    Reviews?: [];
}
