import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';

import { INftNameRepository } from '@nftName/domain/interfaces/repository/nftName-repository.interface';

import { INftRepository } from '@nftName/domain/interfaces/repository/nft-repository.interface';
import { NftNameRepository } from '@nftName/infra/nftName.repository';
import { NftRepository } from '@nftName/infra/nft.repository';
import { NftName } from '@nftName/domain/models/nftName.entity';
import { GetNftNameQuery } from '@nftName/domain/queries/impl/getNftName.query';

@QueryHandler(GetNftNameQuery)
export class GetNftNameInfoQueryHandler
    implements IQueryHandler<GetNftNameQuery>
{
    constructor(
        @InjectRepository(NftNameRepository)
        private readonly _nftNameRepository: INftNameRepository,
        @InjectRepository(NftRepository)
        private readonly _nftRepository: INftRepository
    ) {}

    async execute(nftNumber: GetNftNameQuery): Promise<NftName> {
        const { _nftNumber } = nftNumber;

        const nftInfo = await this._nftRepository.getNftInfoByNumber(
            _nftNumber.nftNumber
        );
        const nftNameInfo = await this._nftNameRepository.getNftNameInfoByUrl(
            nftInfo.imageUrl
        );

        return nftNameInfo;
    }
}
