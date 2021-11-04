import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';

import { GetNftUrlQuery } from '@nftName/domain/queries/impl/getNftUrl.query';
import { INftRepository } from '@nftName/domain/interfaces/repository/nft-repository.interface';
import { Nft } from '@nftName/domain/models/Nft.entity';

@QueryHandler(GetNftUrlQuery)
export class GetNftUrlQueryHandler implements IQueryHandler {
    constructor(
        @InjectRepository(Nft)
        private readonly _nftRepository: INftRepository
    ) {}

    async execute(nftNumber: GetNftUrlQuery): Promise<{ url: string }> {
        const { _nftNumber } = nftNumber;
        const url = this._nftRepository.getNftUrlByNumber(_nftNumber.nftNumber);
        return url;
    }
}
