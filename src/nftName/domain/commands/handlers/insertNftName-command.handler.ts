import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';

import { InsertNftNameCommand } from '@nftName/domain/commands/impl/insertNftName.command';
import { INftNameRepository } from '@nftName/domain/interfaces/repository/nftName-repository.interface';
import { INftRepository } from '@nftName/domain/interfaces/repository/nft-repository.interface';
import { IsUpdateNftNameDto } from '@nftName/domain/dtos/isUpdateNftName.dto';
import { NftNameRepository } from '@nftName/infra/nftName.repository';
import { NftRepository } from '@nftName/infra/nft.repository';

@CommandHandler(InsertNftNameCommand)
export class InsertNftNameCommandHandler
    implements ICommandHandler<InsertNftNameCommand>
{
    constructor(
        @InjectRepository(NftNameRepository)
        private readonly _nftNameRepository: INftNameRepository,
        @InjectRepository(NftRepository)
        private readonly _nftRepository: INftRepository
    ) {}

    async execute(
        insertNftNameData: InsertNftNameCommand
    ): Promise<IsUpdateNftNameDto> {
        try {
            const { _insertNftName } = insertNftNameData;
            const nftInfo = await this._nftRepository.getNftInfoByNumber(
                _insertNftName.nftNumber
            );

            const updateResult = await this._nftNameRepository.insertNftName({
                apName: _insertNftName.apName,
                url: nftInfo.imageUrl,
            });

            if (updateResult.name === _insertNftName.apName)
                return { isUpdate: true };

            return { isUpdate: false };
        } catch (error) {
            throw new Error(error);
        }
    }
}
