import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NftNameController } from '@nftName/app/nftName.controller';
import { NftNameService } from '@nftName/app/nftName.service';
import { NftRepository } from '@nftName/infra/nft.repository';
import { NftNameRepository } from '@nftName/infra/nftName.repository';
import { HiddenRepository } from '@nftName/infra/hidden.repository';
import { QueryHandlers } from '@nftName/domain/queries/handlers';
import { CommandHandlers } from '@nftName/domain/commands/handlers';

@Module({
    imports: [
        CqrsModule,
        TypeOrmModule.forFeature([NftNameRepository, NftRepository, HiddenRepository]),
    ],
    controllers: [NftNameController],
    providers: [
        {
            provide: 'NftNameService',
            useClass: NftNameService,
        },
        ...CommandHandlers,
        ...QueryHandlers,
    ],
})
export class NftNameMoudle {}
