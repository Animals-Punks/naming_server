import { Controller, Get, Inject } from '@nestjs/common';

import { INftNameService } from '@nftName/domain/interfaces/nftName.interface';
import { NftUrlDto } from '@nftName/domain/dtos/nftUrl.dto';
import { ReturnNftNameInfoDto } from '@nftName/domain/dtos/returnNftNameInfo.dto';

@Controller('nftName')
export class NftNameController {
    constructor(
        @Inject('NftNameService')
        private readonly nftNameService: INftNameService
    ) {}

    @Get()
    healthCheck(): string {
        return this.nftNameService.healthCheck();
    }

    @Get('info')
    async getNftNameInfo(
        nftNameParams: NftUrlDto
    ): Promise<ReturnNftNameInfoDto> {
        return await this.nftNameService.getNftNameInfo(nftNameParams);
    }
}
