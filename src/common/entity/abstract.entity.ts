'use strict';

import { PrimaryGeneratedColumn } from 'typeorm';
import { AbstractDto } from '@common/dto/abstract.dto';

export abstract class AbstractEntity<T extends AbstractDto = AbstractDto> {
    @PrimaryGeneratedColumn('uuid', {
        name: 'id',
    })
    id: string;

    abstract toDto(): T;
}
