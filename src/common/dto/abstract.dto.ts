'use strict';

import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class AbstractDto {
    @Expose()
    id: string;
}
