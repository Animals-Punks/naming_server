import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';

import {
    INftNameRepository,
    InsertNftNameInput,
    DeleteNftNameInput,
} from '@nftName/domain/interfaces/repository/nftName-repository.interface';
import { NftName } from '@nftName/domain/models/nftName.entity';

@EntityRepository(NftName)
export class NftNameRepository
    extends BaseRepository<NftName>
    implements INftNameRepository
{
    async getNftNameInfoByUrl(nftUrl: string): Promise<NftName> {
        const nftNameInfo = await this.findOne({
            where: {
                url: nftUrl,
            },
        });
        return nftNameInfo;
    }

    async insertNftName(
        insertNftNameInput: InsertNftNameInput
    ): Promise<NftName> {
        const nftNameInfo = await this.findOne({
            where: {
                url: insertNftNameInput.url,
            },
        });

        const nftName = {
            ...nftNameInfo,
            name: insertNftNameInput.apName
        };
        console.log(nftName);

        const updateNftName = await this.save({
            ...nftName,
        });

        return updateNftName;
    }

    async deleteNftName(
        deleteNftNameInput: DeleteNftNameInput
    ): Promise<NftName> {
        const nftNameInfo = await this.findOne({
            where: {
                url: deleteNftNameInput.url,
            },
        });

        const nftName = {
            ...nftNameInfo,
            name: null
        };

        const deleteNftName = await this.save({
            ...nftName,
        });
        return deleteNftName;
    }
}
