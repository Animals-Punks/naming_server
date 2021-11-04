'use strict';

import { IsString } from 'class-validator';

export class ReturnNftNameInfoDto {
    @IsString()
    readonly name: string;
    readonly url: string;
}
