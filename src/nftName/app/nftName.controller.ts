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
import { NftNumberDto } from '@nftName/domain/dtos/nftNumber.dto';
import { InsertNftNameDto } from '@nftName/domain/dtos/intertNftName.dto';
import { IsUpdateNftNameDto } from '@nftName/domain/dtos/isUpdateNftName.dto';
import { IsDeleteNftNameDto } from '@nftName/domain/dtos/isDeleteNftName.dto';
import { Nft } from '@nftName/domain/models/nft.entity';
import { NftName } from '@nftName/domain/models/nftName.entity';

@Controller('nft')
export class NftNameController {
    constructor(
        @Inject('NftNameService')
        private readonly nftNameService: INftNameService
    ) {}

    @Get()
    healthCheck(): string {
        return this.nftNameService.healthCheck();
    }

    @Get('info/:number')
    async getNftInfo(
        @Param('number')
        nftNumber: number
    ): Promise<Nft> {
        const nft = await this.nftNameService.getNftInfo({ nftNumber });
        return nft;
    }

    @Get('name/:number')
    async getNftNameInfo(
        @Param('number')
        nftNumber: number
    ): Promise<NftName> {
        return await this.nftNameService.getNftName({ nftNumber });
    }

    @Get('owner/:number')
    async getOwner(
        @Param('number')
        nftNumber: number
    ): Promise<string> {
        return await this.nftNameService.getOwner(nftNumber);
    }

    @Post('name')
    async insertNftName(
        @Body()
        insertNftNameData: InsertNftNameDto
    ): Promise<IsUpdateNftNameDto> {
        return await this.nftNameService.insertNftName(insertNftNameData);
    }

    @Delete('name')
    async deleteNftName(
        @Body()
        deleteNftNameData: NftNumberDto
    ): Promise<IsDeleteNftNameDto> {
        return await this.nftNameService.deleteNftName(deleteNftNameData);
    }
}
