import { UpdateResult } from 'typeorm';

import { NftName } from '@nftName/domain/models/nftName.entity';

export interface InputInsertNftName {
    apName: string;
    url: string;
}

export interface INftNameRepository {
    getNftNameInfoByUrl(nftUrl: string): Promise<NftName>;
    insertNftName(
        inputInsertNftName: InputInsertNftName
    ): Promise<UpdateResult>;
}
