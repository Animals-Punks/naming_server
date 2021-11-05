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
        // const nftName = await this.update(
        //     {
        //         url: inputInsertNftName.url,
        //     },
        //     { name: inputInsertNftName.apName }
        // );

        const nftNameInfo = await this.findOne({
            where: {
                url: insertNftNameInput.url,
            },
        });

        const nftName = {
            id: nftNameInfo.id,
            name: nftNameInfo.name,
            url: nftNameInfo.url,
            createdAt: nftNameInfo.createdAt,
            updatedAt: new Date(),
        };

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
            id: nftNameInfo.id,
            name: null,
            url: nftNameInfo.url,
            createdAt: nftNameInfo.createdAt,
            updatedAt: new Date(),
        };

        const deleteNftName = await this.save({
            ...nftName,
        });
        return deleteNftName;
    }
}
