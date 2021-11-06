import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';

import { DeleteNftNameCommand } from '@nftName/domain/commands/impl/deleteNftName.command';
import { INftNameRepository } from '@nftName/domain/interfaces/repository/nftName-repository.interface';
import { INftRepository } from '@nftName/domain/interfaces/repository/nft-repository.interface';
import { IsDeleteNftNameDto } from '@nftName/domain/dtos/isDeleteNftName.dto';
import { NftNameRepository } from '@nftName/infra/nftName.repository';
import { NftRepository } from '@nftName/infra/nft.repository';

@CommandHandler(DeleteNftNameCommand)
export class DeleteNftNameCommandHandler
    implements ICommandHandler<DeleteNftNameCommand>
{
    constructor(
        @InjectRepository(NftNameRepository)
        private readonly _nftNameRepository: INftNameRepository,
        @InjectRepository(NftRepository)
        private readonly _nftRepository: INftRepository
    ) {}

    async execute(
        deleteNftName: DeleteNftNameCommand
    ): Promise<IsDeleteNftNameDto> {
        try {
            const { _nftNumber } = deleteNftName;
            const nftInfo = await this._nftRepository.getNftInfoByNumber(
                _nftNumber.nftNumber
            );

            const updateResult = await this._nftNameRepository.deleteNftName({
                url: nftInfo.imageUrl,
            });

            if (updateResult.name === null) return { isDelete: true };

            return { isDelete: false };
        } catch (error) {
            throw new Error(error);
        }
    }
}
