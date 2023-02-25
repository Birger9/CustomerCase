import { SetMetadata } from '@nestjs/common';
import { Rights } from 'src/enums/rights.enum';


export const HasRights = (...rights: Rights[]) => SetMetadata('rights', rights);