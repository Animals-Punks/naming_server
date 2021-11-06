import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';

import { INftRepository } from '@nftName/domain/interfaces/repository/nft-repository.interface';
import { Nft } from '@src/nftName/domain/models/nft.entity';

@EntityRepository(Nft)
export class NftRepository
    extends BaseRepository<Nft>
    implements INftRepository
{
    async getNftInfoByNumber(nftNumber: number): Promise<Nft> {
        const nftInfo = await this.findOne({
            where: {
                apName: `Animals Punks #${nftNumber}`,
            },
        });
        return nftInfo;
    }

    async getNftUrlByNumber(nftNumber: number): Promise<{ url: string }> {
        const nftInfo = await this.findOne({
            where: {
                apName: `Animals Punks #${nftNumber}`,
            },
        });
        return { url: nftInfo.imageUrl };
    }
}
