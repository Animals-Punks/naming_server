import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';

import { INftNameRepository } from '@nftName/domain/interfaces/repository/nftName-repository.interface';
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
}
