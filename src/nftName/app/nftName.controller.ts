import {
    Body,
    Controller,
    Get,
    Inject,
    Param,
    Post,
    Header,
} from '@nestjs/common';

import { INftNameService } from '@nftName/domain/interfaces/nftName.interface';
import { ReturnNftNameInfoDto } from '@nftName/domain/dtos/returnNftNameInfo.dto';
import { NftNumberDto } from '@nftName/domain/dtos/nftNumber.dto';
import { InsertNftNameDto } from '@nftName/domain/dtos/interNftName.dto';

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

    @Get(':number')
    async getNftNameInfo(
        @Param('number')
        nftNumberDto: NftNumberDto
    ): Promise<ReturnNftNameInfoDto> {
        return await this.nftNameService.getNftNameInfo(nftNumberDto);
    }

    @Post()
    async insertNftName(
        @Body()
        insertNftNameData: InsertNftNameDto
    ): Promise<boolean> {
        return await this.nftNameService.insertNftName(insertNftNameData);
    }
}
