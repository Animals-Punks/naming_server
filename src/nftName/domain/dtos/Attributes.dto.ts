'use strict';

import { IsString } from 'class-validator';

export class AttributesDto {
    @IsString()
    readonly trait_type: string;
    readonly value: string;
}
