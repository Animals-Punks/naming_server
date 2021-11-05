import { ICommand } from '@nestjs/cqrs';

import { NftNumberDto } from '@nftName/domain/dtos/nftNumber.dto';

export class DeleteNftNameCommand implements ICommand {
    constructor(public readonly _nftNumber: NftNumberDto) {}
}
