import { DatePipe } from '@angular/common';

export class Advertisements {
    AdId: number;
    AdCategory: number;
    AdDateRequest: Date;
    AdDateBegin: Date;
    AdDateEnd: Date;
    AdHeight: number;
    AdWidth: number;
    AdUserId: number;
    AdFiles: string;
    AdViews: number;
    AdStatus: boolean;
}