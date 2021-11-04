import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';

import { INftNameRepository } from '@nftName/domain/interfaces/repository/nftName-repository.interface';
import { NftName } from '@nftName/domain/models/nftName.entity';
import { GetNftNameInfoQuery } from '@nftName/domain/queries/impl/getNftNameInfo.query';
import { Nft } from '@nftName/domain/models/Nft.entity';
import { INftRepository } from '@nftName/domain/interfaces/repository/nft-repository.interface';

@QueryHandler(GetNftNameInfoQuery)
export class GetNftNameInfoQueryHandler implements IQueryHandler {
    constructor(
        @InjectRepository(NftName)
        private readonly _nftNameRepository: INftNameRepository,
        @InjectRepository(Nft)
        private readonly _nftRepository: INftRepository
    ) {}

    async execute(nftUrl: GetNftNameInfoQuery): Promise<NftName> {
        const { _nftUrl } = nftUrl;
        const nftNameInfo = await this._nftNameRepository.getNftNameInfoByUrl(
            _nftUrl.nftUrl
        );
        const nftInfo = await this._nftRepository.getNftByUrl(nftNameInfo.url);
        // const returnResult = {
        //     name: `nftInfo.apName ${nftNameInfo.name}`,
        //     image: nftInfo.imageUrl,
        //     attributes: [
        //         {
        //             trait_type: 'background',
        //             value: nftInfo.background
        //         },
        //         {
        //             trait_type: 'species',
        //             value: nftInfo.species
        //         },
        //         {
        //             trait_type: 'eyes',
        //             value: nftInfo.eyes
        //         },
        //         {
        //             trait_type: 'mouth',
        //             value: nftInfo.mouth
        //         },
        //         {
        //             trait_type: 'clothes',
        //             value: nftInfo.clothes
        //         },
        //         {
        //             trait_type: 'head',
        //             value: nftInfo.head
        //         },
        //         {
        //             trait_type: 'accessory',
        //             value: nftInfo.accessory
        //         },
        //     ]
        // }
        return nftNameInfo;
    }
}
