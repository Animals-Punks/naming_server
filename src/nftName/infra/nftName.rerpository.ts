import { EntityRepository, UpdateResult } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';

import {
    INftNameRepository,
    InputInsertNftName,
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
        inputInsertNftName: InputInsertNftName
    ): Promise<UpdateResult> {
        const nftName = await this.update(
            {
                url: inputInsertNftName.url,
            },
            { name: inputInsertNftName.apName }
        );
        return nftName;
    }
}
