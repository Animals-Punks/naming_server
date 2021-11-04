import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NftNameController } from '@nftName/app/nftName.controller';
import { NftNameService } from '@nftName/app/nftName.service';
import { NftRepository } from '@nftName/infra/nft.repository';
import { NftNameRepository } from '@nftName/infra/nftName.rerpository';
import { QueryHandlers } from '@nftName/domain/queries/handlers';

@Module({
    imports: [
        NftRepository,
        NftNameRepository,
        CqrsModule,
        TypeOrmModule.forFeature([NftRepository, NftNameRepository]),
    ],
    controllers: [NftNameController],
    providers: [
        {
            provide: 'NftNameService',
            useClass: NftNameService,
        },
        ...QueryHandlers,
    ],
})
export class NftNameMoudle {}
