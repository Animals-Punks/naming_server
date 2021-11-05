import { Nft } from '@nftName/domain/models/Nft.entity';

export interface INftRepository {
    getNftInfoByNumber(nftNumber: number): Promise<Nft>;
    getNftUrlByNumber(nftNumber: number): Promise<{ url: string }>;
}
