import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateResult } from 'typeorm';

import { InsertNftNameCommand } from '@nftName/domain/commands/impl/insertNftName.command';
import { INftNameRepository } from '@nftName/domain/interfaces/repository/nftName-repository.interface';
import { Nft } from '@nftName/domain/models/Nft.entity';
import { NftName } from '@nftName/domain/models/nftName.entity';
import { INftRepository } from '@nftName/domain/interfaces/repository/nft-repository.interface';

@CommandHandler(InsertNftNameCommand)
export class InsertNftNameCommandHandler implements ICommandHandler {
    constructor(
        @InjectRepository(NftName)
        private readonly _nftNameRepository: INftNameRepository,
        @InjectRepository(Nft)
        private readonly _nftRepository: INftRepository
    ) {}

    async updateName(apName: string, url: string): Promise<UpdateResult> {
        const updateResult = await this._nftNameRepository.insertNftName({
            apName: apName,
            url,
        });
        return updateResult;
    }

    async execute(insertNftNameData: InsertNftNameCommand) {
        try {
            const { _insertNftName } = insertNftNameData;
            const nftInfo = await this._nftRepository.getNftInfoByNumber(
                _insertNftName.nftNumber
            );
            const nftNameInfo =
                await this._nftNameRepository.getNftNameInfoByUrl(
                    nftInfo.imageUrl
                );

            if (nftNameInfo.name) {
                this.updateName(_insertNftName.apName, nftInfo.imageUrl);
                return true;
            }
            this.updateName(_insertNftName.apName, nftInfo.imageUrl);
            return true;
        } catch (error) {
            return false;
        }
    }
}
