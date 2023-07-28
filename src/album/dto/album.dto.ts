import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsUUID,
  ValidateIf,
} from 'class-validator';
import { NewAlbum } from 'src/common/interfaces/album.interface';

export class AlbumDto implements NewAlbum {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNumber()
  year: number;

  @ApiProperty({ nullable: true, type: String, format: 'uuid' })
  @ValidateIf(({ artistId }) => artistId !== null)
  @IsUUID()
  artistId: string | null;
}
