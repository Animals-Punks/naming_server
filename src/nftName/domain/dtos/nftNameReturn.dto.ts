'use strict';

import { IsArray, IsString } from 'class-validator';

import { AttributesDto } from './Attributes.dto';

export class NftNameReturnDto {
    @IsString()
    readonly name: string;
    readonly image: string;

    @IsArray()
    readonly attributes: AttributesDto[];
}
