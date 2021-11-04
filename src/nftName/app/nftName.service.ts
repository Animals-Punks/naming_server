import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import {
    INftNameService,
    GetNftNameInfoParams,
} from '@nftName/domain/interfaces/nftName.interface';
import { NftName } from '@nftName/domain/models/nftName.entity';
import { GetNftNameInfoQuery } from '@nftName/domain/queries/impl/getNftNameInfo.query';

@Injectable()
export class NftNameService implements INftNameService {
    constructor(private readonly _queryBus: QueryBus) {}

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
}
