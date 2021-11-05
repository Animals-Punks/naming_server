import { NftName } from '@nftName/domain/models/nftName.entity';

export interface InsertNftNameInput {
    apName: string;
    url: string;
}

export interface DeleteNftNameInput {
    url: string;
}

export interface INftNameRepository {
    getNftNameInfoByUrl(nftUrl: string): Promise<NftName>;
    insertNftName(inputInsertNftName: InsertNftNameInput): Promise<NftName>;
    deleteNftName(deleteNftNameInput: DeleteNftNameInput): Promise<NftName>;
}
