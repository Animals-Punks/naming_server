import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';

import { AbstractDto } from '@common/dto/abstract.dto';

@Exclude()
export class HiddenDto extends AbstractDto {
    @Expose()
    @IsString()
    readonly apName: string;
    readonly imageUrl: string;
    readonly species: string;
    readonly type: string;
}
