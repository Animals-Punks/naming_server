import { Column, Entity, Index } from 'typeorm';
import { plainToClass } from 'class-transformer';

import { AbstractEntity } from '@common/entity/abstract.entity';
import { HiddenDto } from '@nftName/domain/dtos/hidden.dto';

@Index('hidden_pkey', ['id'], { unique: true })
@Entity('hidden', { schema: 'V2' })
export class Hidden extends AbstractEntity<HiddenDto> {
    @Column('text', { name: 'ap_name', unique: true })
    apName: string;

    @Column('text', { name: 'image_url', unique: true })
    imageUrl: string;

    @Column('text', { name: 'species', unique: false })
    species: string;

    @Column('text', { name: 'type', unique: false, nullable: true })
    type: string;

    toDto() {
        return plainToClass(HiddenDto, this);
    }
}
