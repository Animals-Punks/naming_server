import { NftName } from '@nftName/domain/models/nftName.entity';

export interface GetNftNameInfoParams {
    nftUrl: string;
}

export interface INftNameService {
    healthCheck(): string;
    getNftNameInfo(
        getNftNameInfoParams: GetNftNameInfoParams
    ): Promise<NftName>;
}
