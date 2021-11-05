import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Transactional } from 'typeorm-transactional-cls-hooked';

import {
    INftNameService,
    GetNftNameInfoParams,
    InsertNftNameDataData,
    InserNftNameDataReturn,
    DeleteNftNameData,
    DeletNftNameReturn,
} from '@nftName/domain/interfaces/nftName.interface';
import { NftName } from '@nftName/domain/models/nftName.entity';
import { GetNftNameInfoQuery } from '@nftName/domain/queries/impl/getNftNameInfo.query';
import { InsertNftNameCommand } from '@nftName/domain/commands/impl/insertNftName.command';
import { InsertDataException } from '@common/errors/http.error';
import { DeleteNftNameCommand } from '../domain/commands/impl/deleteNftName.command';

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

    @Transactional()
    async insertNftName(
        insertNftNameDataData: InsertNftNameDataData
    ): Promise<InserNftNameDataReturn> {
        try {
            const insertNftNameResult = await this._commandBus.execute(
                new InsertNftNameCommand(insertNftNameDataData)
            );
            return insertNftNameResult;
        } catch (error) {
            throw new InsertDataException(
                'Update animals punks name failed. Please try again.'
            );
        }
    }

    @Transactional()
    async deleteNftName(
        deleteNftNameData: DeleteNftNameData
    ): Promise<DeletNftNameReturn> {
        try {
            const deleteNftNameResult = await this._commandBus.execute(
                new DeleteNftNameCommand(deleteNftNameData)
            );
            return deleteNftNameResult;
        } catch (error) {
            throw new InsertDataException(
                'Delete animals punks name failed. Please try again.'
            );
        }
    }
}
