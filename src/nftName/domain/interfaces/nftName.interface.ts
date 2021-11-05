import { NftName } from '@nftName/domain/models/nftName.entity';

export interface GetNftNameInfoParams {
    nftNumber: number;
}

export interface InsertNftNameDataData {
    nftNumber: number;
    apName: string;
}

export interface INftNameService {
    healthCheck(): string;
    getNftNameInfo(
        getNftNameInfoParams: GetNftNameInfoParams
    ): Promise<NftName>;
    insertNftName(
        insertNftNameDataData: InsertNftNameDataData
    ): Promise<boolean>;
}
