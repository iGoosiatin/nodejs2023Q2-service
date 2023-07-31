import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';
import { NewTrack } from '../../common/interfaces/track.interface';
import { IsNullable } from '../../common/decorators/validation';

export class TrackDto implements NewTrack {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ nullable: true, type: String, format: 'uuid' })
  @IsUUID()
  @IsNullable()
  artistId: string | null;

  @ApiProperty({ nullable: true, type: String, format: 'uuid' })
  @IsUUID()
  @IsNullable()
  albumId: string | null;

  @ApiProperty()
  @IsNumber()
  duration: number;
}
