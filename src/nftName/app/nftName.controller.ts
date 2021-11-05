import {
    Body,
    Controller,
    Get,
    Inject,
    Param,
    Post,
    Delete,
} from '@nestjs/common';

import { INftNameService } from '@nftName/domain/interfaces/nftName.interface';
import { ReturnNftNameInfoDto } from '@nftName/domain/dtos/returnNftNameInfo.dto';
import { NftNumberDto } from '@nftName/domain/dtos/nftNumber.dto';
import { InsertNftNameDto } from '@nftName/domain/dtos/intertNftName.dto';
import { IsUpdateNftNameDto } from '@nftName/domain/dtos/isUpdateNftName.dto';
import { IsDeleteNftNameDto } from '@nftName/domain/dtos/isDeleteNftName.dto';

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
    ): Promise<IsUpdateNftNameDto> {
        return await this.nftNameService.insertNftName(insertNftNameData);
    }

    @Delete()
    async deleteNftName(
        @Body()
        deleteNftNameData: NftNumberDto
    ): Promise<IsDeleteNftNameDto> {
        return await this.nftNameService.deleteNftName(deleteNftNameData);
    }
}
