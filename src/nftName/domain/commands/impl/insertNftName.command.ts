import { ICommand } from '@nestjs/cqrs';

import { InsertNftNameDto } from '@src/nftName/domain/dtos/intertNftName.dto';

export class InsertNftNameCommand implements ICommand {
    constructor(public readonly _insertNftName: InsertNftNameDto) {}
}
