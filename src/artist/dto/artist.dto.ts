import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';
import { NewArtist } from '../../common/interfaces/artist.interface';

export class ArtistDto implements NewArtist {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsBoolean()
  grammy: boolean;
}
