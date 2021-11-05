import { ICommand } from '@nestjs/cqrs';

import { InsertNftNameDto } from '@nftName/domain/dtos/interNftName.dto';

export class InsertNftNameCommand implements ICommand {
    constructor(public readonly _insertNftName: InsertNftNameDto) {}
}
