import { NftName } from '@nftName/domain/models/nftName.entity';

export interface INftNameRepository {
    getNftNameInfoByUrl(nftUrl: string): Promise<NftName>;
}
