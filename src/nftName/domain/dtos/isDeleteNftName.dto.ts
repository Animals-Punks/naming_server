'use strict';

import { IsBoolean } from 'class-validator';

export class IsDeleteNftNameDto {
    @IsBoolean()
    readonly isDelete: boolean;
}
