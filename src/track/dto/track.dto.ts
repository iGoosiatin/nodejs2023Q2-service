import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsUUID,
  ValidateIf,
} from 'class-validator';
import { NewTrack } from 'src/common/interfaces/track.interface';

export class TrackDto implements NewTrack {
  @IsString()
  @IsNotEmpty()
  name: string;

  @ValidateIf(({ artistId }) => artistId !== null)
  @IsUUID()
  artistId: string | null;

  @ValidateIf(({ albumId }) => albumId !== null)
  @IsUUID()
  albumId: string | null;

  @IsNumber()
  duration: number;
}
