import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';

import { INftNameRepository } from '@nftName/domain/interfaces/repository/nftName-repository.interface';
import { GetNftInfoQuery } from '@src/nftName/domain/queries/impl/getNftInfo.query';
import { INftRepository } from '@nftName/domain/interfaces/repository/nft-repository.interface';
import { NftNameReturnDto } from '@nftName/domain/dtos/nftNameReturn.dto';
import { NftNameRepository } from '@nftName/infra/nftName.repository';
import { NftRepository } from '@nftName/infra/nft.repository';
import { HiddenRepository } from '@nftName/infra/hidden.repository';
import { IHiddenRepository } from '@nftName/domain/interfaces/repository/hidden-repository.interface';

@QueryHandler(GetNftInfoQuery)
export class GetNftInfoQueryHandler implements IQueryHandler<GetNftInfoQuery> {
    constructor(
        @InjectRepository(NftNameRepository)
        private readonly _nftNameRepository: INftNameRepository,
        @InjectRepository(NftRepository)
        private readonly _nftRepository: INftRepository,
        @InjectRepository(HiddenRepository)
        private readonly _hiddenRepository: IHiddenRepository
    ) {}

    async execute(nftNumber: GetNftInfoQuery): Promise<NftNameReturnDto> {
        const { _nftNumber } = nftNumber;

        const nftInfo = await this._nftRepository.getNftInfoByNumber(
            _nftNumber.nftNumber
        );

        const nftNameInfo = await this._nftNameRepository.getNftNameInfoByUrl(
            nftInfo.imageUrl
        );

        const hidden = await this._hiddenRepository.findByUrl(nftInfo.imageUrl);

        if (hidden !== undefined) {
            const hiddenResult = {
                name: hidden.apName,
                image: hidden.imageUrl,
                attributes: [
                    {
                        trait_type: 'hidden',
                        value: hidden.type,
                    },
                    {
                        trait_type: 'species',
                        value: hidden.species,
                    },
                ],
            };
            if (nftNameInfo.name !== null) {
                hiddenResult.name = `${nftInfo.apName} ${nftNameInfo.name}`;
                return hiddenResult;
            }
            return hiddenResult;
        }

        const returnResult = {
            name: nftInfo.apName,
            image: nftInfo.imageUrl,
            attributes: [
                {
                    trait_type: 'background',
                    value: nftInfo.background,
                },
                {
                    trait_type: 'species',
                    value: nftInfo.species,
                },
                {
                    trait_type: 'eyes',
                    value: nftInfo.eyes,
                },
                {
                    trait_type: 'mouth',
                    value: nftInfo.mouth,
                },
                {
                    trait_type: 'clothes',
                    value: nftInfo.clothes,
                },
                {
                    trait_type: 'head',
                    value: nftInfo.head,
                },
                {
                    trait_type: 'accessory',
                    value: nftInfo.accessory,
                },
            ],
        };

        if (nftNameInfo.name !== null) {
            returnResult.name = `${nftInfo.apName} ${nftNameInfo.name}`;
            return returnResult;
        }
        return returnResult;
    }
}
