import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';
import { NewArtist } from 'src/common/interfaces/artist.interface';

export class ArtistDto implements NewArtist {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  grammy: boolean;
}
