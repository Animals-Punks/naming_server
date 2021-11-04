import { IQuery } from '@nestjs/cqrs';

import { NftUrlDto } from '@nftName/domain/dtos/nftUrl.dto';

export class GetNftNameInfoQuery implements IQuery {
    constructor(public readonly _nftUrl: NftUrlDto) {}
}
