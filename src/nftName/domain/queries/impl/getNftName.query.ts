import { IQuery } from '@nestjs/cqrs';

import { NftNumberDto } from '@nftName/domain/dtos/nftNumber.dto';

export class GetNftNameQuery implements IQuery {
    constructor(public readonly _nftNumber: NftNumberDto) {}
}
