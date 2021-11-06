import { Column, Entity, Index } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { v4 as uuidv4 } from 'uuid';
import { randomBytes } from 'crypto';

import { AbstractEntity } from '@common/entity/abstract.entity';
import { NftDto } from '@nftName/domain/dtos/nft.dto';

@Index('nft_pkey', ['id'], { unique: true })
@Entity('nfts', { schema: 'V2' })
export class Nft extends AbstractEntity<NftDto> {
    @Column('text', { name: 'ap_name', unique: true })
    apName: string;

    @Column('text', { name: 'image_url', unique: true })
    imageUrl: string;

    @Column('text', { name: 'background' })
    background: string;

    @Column('text', { name: 'species' })
    species: string;

    @Column('text', { name: 'eyes' })
    eyes: string;

    @Column('text', { name: 'mouth' })
    mouth: string;

    @Column('text', { name: 'clothes' })
    clothes: string;

    @Column('text', { name: 'head' })
    head: string;

    @Column('text', { name: 'accessory' })
    accessory: string;

    toDto() {
        return plainToClass(NftDto, this);
    }

    public static generateNftId(): string {
        return uuidv4({ random: randomBytes(16) });
    }
}
