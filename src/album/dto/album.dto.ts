import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsUUID,
  ValidateIf,
} from 'class-validator';
import { NewAlbum } from 'src/common/interfaces/album.interface';

export class AlbumDto implements NewAlbum {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  year: number;

  @ValidateIf((album) => album.artistId !== null)
  @IsUUID()
  artistId: string | null;
}
