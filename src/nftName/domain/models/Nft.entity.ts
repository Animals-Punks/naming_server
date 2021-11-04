import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('nft_pkey', ['id'], { unique: true })
@Entity('nfts', { schema: 'V2' })
export class Nft {
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id: string;

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
}
