export interface CampaignModel {
    id: string | null;
    status: boolean | null;
    targeting: TargetingModel;
    segments: SegmentModel[];
}

export interface TargetingModel {
    name: string | null;
    budget: number | null;
    bid: number | null;
    startDate: Date | null;
    endDate: Date | null;
}

export interface SegmentModel {
         id: string;
         name: string;
}
