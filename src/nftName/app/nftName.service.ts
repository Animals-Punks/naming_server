import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Transactional } from 'typeorm-transactional-cls-hooked';
const Caver = require('caver-js');

import { CaverJsConfig } from '@config';
import {
    INftNameService,
    GetNftNameInfoParams,
    InsertNftNameDataData,
    InserNftNameDataReturn,
    DeleteNftNameData,
    DeletNftNameReturn,
} from '@nftName/domain/interfaces/nftName.interface';
import { NftName } from '@nftName/domain/models/nftName.entity';
import { GetNftInfoQuery } from '@nftName/domain/queries/impl/getNftInfo.query';
import { GetNftNameQuery } from '@nftName/domain/queries/impl/getNftName.query';
import { InsertNftNameCommand } from '@nftName/domain/commands/impl/insertNftName.command';
import { DeleteNftNameCommand } from '@nftName/domain/commands/impl/deleteNftName.command';
import { InsertDataException } from '@common/errors/http.error';
import { Nft } from '@nftName/domain/models/nft.entity';

@Injectable()
export class NftNameService implements INftNameService {
    constructor(
        private readonly _queryBus: QueryBus,
        private readonly _commandBus: CommandBus
    ) {}

    healthCheck(): string {
        return 'Server is Running 🚀';
    }

    async getNftInfo(getNftNameInfoParams: GetNftNameInfoParams): Promise<Nft> {
        const nftInfo = await this._queryBus.execute(
            new GetNftInfoQuery(getNftNameInfoParams)
        );
        return nftInfo;
    }

    async getNftName(
        getNftNameInfoParams: GetNftNameInfoParams
    ): Promise<NftName> {
        const nftNameInfo = await this._queryBus.execute(
            new GetNftNameQuery(getNftNameInfoParams)
        );
        return nftNameInfo;
    }

    async getOwner(nftNumber: number): Promise<string> {
        const accessKeyId = CaverJsConfig.accessKey;
        const secretAccessKey = CaverJsConfig.secretKey;

        const options = {
            headers: [
                {
                    name: 'Authorization',
                    value:
                        'Basic ' +
                        Buffer.from(
                            accessKeyId + ':' + secretAccessKey
                        ).toString('base64'),
                },
                { name: 'x-chain-id', value: '8217' },
            ],
        };

        const httpProvider = new Caver.providers.HttpProvider(
            CaverJsConfig.endPoint,
            options
        );

        const caver = new Caver(httpProvider);
        const kipInstance = new caver.klay.KIP17(CaverJsConfig.tokenAddress);
        const owner = await kipInstance.ownerOf(nftNumber);
        return owner;
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
