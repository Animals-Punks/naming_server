import { IQuery } from '@nestjs/cqrs';

import { NftNumberDto } from '@nftName/domain/dtos/nftNumber.dto';

export class GetNftInfoQuery implements IQuery {
    constructor(public readonly _nftNumber: NftNumberDto) {}
}
