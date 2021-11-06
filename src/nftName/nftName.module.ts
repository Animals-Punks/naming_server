import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NftNameController } from '@nftName/app/nftName.controller';
import { NftNameService } from '@nftName/app/nftName.service';
import { NftRepository } from '@nftName/infra/nft.repository';
import { NftNameRepository } from '@nftName/infra/nftName.repository';
import { QueryHandlers } from '@nftName/domain/queries/handlers';
import { CommandHandlers } from '@nftName/domain/commands/handlers';

@Module({
    imports: [
        CqrsModule,
        TypeOrmModule.forFeature([NftRepository, NftNameRepository]),
        NftRepository,
        NftNameRepository,
    ],
    controllers: [NftNameController],
    providers: [
        {
            provide: 'NftNameService',
            useClass: NftNameService,
        },
        ...QueryHandlers,
        ...CommandHandlers,
    ],
})
export class NftNameMoudle {}
