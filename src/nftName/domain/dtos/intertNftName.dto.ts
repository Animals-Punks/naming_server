'use strict';

import { IsApNumber } from '@common/decorators/validators/is-ap-number.decorator';
import { IsString } from 'class-validator';

export class InsertNftNameDto {
    @IsApNumber({ message: 'Please Check out your Animals Punks number' })
    nftNumber: number;

    @IsString()
    apName: string;
}
