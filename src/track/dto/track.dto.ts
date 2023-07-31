import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsUUID,
  ValidateIf,
} from 'class-validator';
import { NewTrack } from '../../common/interfaces/track.interface';

export class TrackDto implements NewTrack {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ nullable: true, type: String, format: 'uuid' })
  @ValidateIf(({ artistId }) => artistId !== null)
  @IsUUID()
  artistId: string | null;

  @ApiProperty({ nullable: true, type: String, format: 'uuid' })
  @ValidateIf(({ albumId }) => albumId !== null)
  @IsUUID()
  albumId: string | null;

  @ApiProperty()
  @IsNumber()
  duration: number;
}
