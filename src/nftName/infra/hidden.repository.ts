import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';

import { Hidden } from '@nftName/domain/models/hidden.entity';
import { IHiddenRepository } from '@nftName/domain/interfaces/repository/hidden-repository.interface';

@EntityRepository(Hidden)
export class HiddenRepository extends BaseRepository<Hidden> implements IHiddenRepository {
    async findByUrl(url: string): Promise<Hidden> {
        const hidden = await this.findOne({
            where: {
                imageUrl: url,
            },
        });
        return hidden;
    }
}
