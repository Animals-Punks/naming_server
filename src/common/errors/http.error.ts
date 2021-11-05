import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundException extends HttpException {
    constructor(message: string) {
        super(message, HttpStatus.NOT_FOUND);
    }
}

export class InsertDataException extends HttpException {
    constructor(message: string) {
        super(message, HttpStatus.BAD_REQUEST);
    }
}
