import { AbstractDto } from '@common/dto/abstract.dto';
import { IsString } from 'class-validator';

export class NftDto extends AbstractDto {
    @IsString()
    readonly apName: string;
    readonly imageUrl: string;
    readonly background: string;
    readonly apNamespecies: string;
    readonly eyes: string;
    readonly mouth: string;
    readonly clothes: string;
    readonly head: string;
    readonly accessory: string;
}
