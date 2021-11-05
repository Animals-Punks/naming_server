'use strict';

import { IsBoolean } from 'class-validator';

export class IsUpdateNftNameDto {
    @IsBoolean()
    readonly isUpdate: boolean;
}
