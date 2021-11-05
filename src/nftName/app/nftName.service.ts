import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import {
    INftNameService,
    GetNftNameInfoParams,
    InsertNftNameDataData,
} from '@nftName/domain/interfaces/nftName.interface';
import { NftName } from '@nftName/domain/models/nftName.entity';
import { GetNftNameInfoQuery } from '@nftName/domain/queries/impl/getNftNameInfo.query';
import { InsertNftNameCommand } from '@nftName/domain/commands/impl/insertNftName.command';

@Injectable()
export class NftNameService implements INftNameService {
    constructor(
        private readonly _queryBus: QueryBus,
        private readonly _commandBus: CommandBus
    ) {}

    healthCheck(): string {
        return 'Server is Running 🚀';
    }

    async getNftNameInfo(
        getNftNameInfoParams: GetNftNameInfoParams
    ): Promise<NftName> {
        const nftNameInfo = await this._queryBus.execute(
            new GetNftNameInfoQuery(getNftNameInfoParams)
        );
        return nftNameInfo;
    }

    async insertNftName(
        insertNftNameDataData: InsertNftNameDataData
    ): Promise<boolean> {
        const insertNftNameResult = await this._commandBus.execute(
            new InsertNftNameCommand(insertNftNameDataData)
        );
        return insertNftNameResult;
    }
}
