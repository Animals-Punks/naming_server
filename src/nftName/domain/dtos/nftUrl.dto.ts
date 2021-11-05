'use strict';

import { IsString } from 'class-validator';

export class NftName {
    @IsString()
    readonly nftUrl: string;
}
