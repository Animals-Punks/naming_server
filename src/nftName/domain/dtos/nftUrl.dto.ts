'use strict';

import { IsString } from 'class-validator';

export class NftUrlDto {
    @IsString()
    readonly nftUrl: string;
}
