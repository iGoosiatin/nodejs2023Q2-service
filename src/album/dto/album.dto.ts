import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';
import { NewAlbum } from '../../common/interfaces/album.interface';
import { IsNullable } from '../../common/decorators/validation';

export class AlbumDto implements NewAlbum {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNumber()
  year: number;

  @ApiProperty({ nullable: true, type: String, format: 'uuid' })
  @IsUUID()
  @IsNullable()
  artistId: string | null;
}
