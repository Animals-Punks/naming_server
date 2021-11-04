'use strict';

import { IsApNumber } from '@src/common/decorators/validators/is-ap-number.decorator';

export class NftNumberDto {
    @IsApNumber({ message: 'Please Check out your Animals Punks number' })
    nftNumber: number;
}
