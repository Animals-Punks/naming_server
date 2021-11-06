import { NftName } from '@nftName/domain/models/nftName.entity';
import { Nft } from '@nftName/domain/models/nft.entity';

export interface GetNftNameInfoParams {
    nftNumber: number;
}

export interface InsertNftNameDataData {
    nftNumber: number;
    apName: string;
}

export interface InserNftNameDataReturn {
    isUpdate: boolean;
}

export interface DeleteNftNameData {
    nftNumber: number;
}

export interface DeletNftNameReturn {
    isDelete: boolean;
}

export interface INftNameService {
    healthCheck(): string;
    getNftInfo(getNftNameInfoParams: GetNftNameInfoParams): Promise<Nft>;
    getNftName(getNftNameInfoParams: GetNftNameInfoParams): Promise<NftName>;
    insertNftName(
        insertNftNameDataData: InsertNftNameDataData
    ): Promise<InserNftNameDataReturn>;
    deleteNftName(
        deleteNftNameData: DeleteNftNameData
    ): Promise<DeletNftNameReturn>;
}
